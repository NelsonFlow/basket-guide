const https = require('https');
const fs = require('fs');
const path = require('path');

const sujets = [
  "Meilleur protège-cheville de basket 2026",
  "Chaussures de basket pour femme 2026",
  "Meilleur short de basket 2026",
  "Comment entretenir ses chaussures de basket",
  "Meilleur filet de basket extérieur 2026",
  "Chaussures de basket pour débutant 2026",
  "Meilleur débardeur de basket 2026",
  "Comment choisir sa taille de chaussure de basket",
  "Meilleur chronomètre de basket 2026",
  "Pompe à ballon de basket : notre comparatif",
  "Chaussures de basket montantes vs basses",
  "Meilleur protège-coude de basket 2026",
  "Comment améliorer son dribble au basket",
  "Meilleur tableau de score de basket 2026",
  "Chaussures de basket pour joueur de pivot 2026",
  "Meilleur sac à dos de basket 2026",
  "Comment choisir ses semelles pour le basket",
  "Meilleur bracelet de poignet de basket 2026",
  "Chaussures de basket Nike vs Adidas comparatif",
  "Meilleur ballon de basket pour enfant 2026",
];

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function getDate() {
  return new Date().toISOString().split('T')[0];
}

function getRandomSujet() {
  const postsDir = path.join(process.cwd(), 'posts');
  const existing = fs.readdirSync(postsDir).map(f => f.replace('.md', ''));
  const disponibles = sujets.filter(s => !existing.includes(slugify(s)));
  if (disponibles.length === 0) return sujets[Math.floor(Math.random() * sujets.length)];
  return disponibles[Math.floor(Math.random() * disponibles.length)];
}

function callClaude(sujet) {
  return new Promise((resolve, reject) => {
    const prompt = `Tu es un expert en équipement de basket. Rédige un article comparatif SEO en français sur le sujet suivant : "${sujet}".

L'article doit :
- Faire entre 600 et 900 mots
- Commencer par une introduction directe sans titre h1
- Contenir 3 produits recommandés avec leurs points forts
- Chaque produit doit avoir un lien Amazon avec le tag sportguidefr-21 au format : [Voir le prix sur Amazon](https://www.amazon.fr/s?k=NOM+DU+PRODUIT&tag=sportguidefr-21)
- Se terminer par une conclusion avec une recommandation claire
- Utiliser des titres h2 et h3
- Ne pas utiliser de tirets comme ponctuation
- Être naturel et honnête, pas trop commercial

Réponds uniquement avec le contenu Markdown de l'article, sans frontmatter.`;

    const body = JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log('Réponse API:', JSON.stringify(parsed).substring(0, 200));
          if (parsed.content && parsed.content[0] && parsed.content[0].text) {
            resolve(parsed.content[0].text);
          } else {
            reject(new Error('Réponse inattendue: ' + JSON.stringify(parsed)));
          }
        } catch (e) {
          reject(new Error('Erreur parsing: ' + e.message + ' Data: ' + data.substring(0, 200)));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const sujet = getRandomSujet();
  const slug = slugify(sujet);
  const date = getDate();

  console.log(`Génération de l'article : ${sujet}`);

  const content = await callClaude(sujet);

  const category = sujet.toLowerCase().includes('chaussure') ? 'Chaussures'
    : sujet.toLowerCase().includes('ballon') ? 'Ballons'
    : 'Accessoires';

  const frontmatter = `---
title: "${sujet}"
date: "${date}"
description: "Comparatif et guide d'achat pour ${sujet.toLowerCase()}. On vous aide à faire le bon choix selon votre budget et votre niveau."
category: "${category}"
---

`;

  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
  fs.writeFileSync(filePath, frontmatter + content);
  console.log(`Article créé : ${filePath}`);
}

main().catch(console.error);