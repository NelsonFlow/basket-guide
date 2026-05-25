const https = require('https');
const fs = require('fs');
const path = require('path');

const sujets = [
  { titre: "Meilleur protège-cheville de basket 2026", produit: "McDavid 195 protège-cheville basket", categorie: "Accessoires" },
  { titre: "Chaussures de basket pour femme 2026", produit: "Nike Court Vision Mid femme basket", categorie: "Chaussures" },
  { titre: "Meilleur short de basket 2026", produit: "Nike Dri-FIT short basket", categorie: "Accessoires" },
  { titre: "Comment entretenir ses chaussures de basket", produit: "Crep Protect spray chaussures", categorie: "Accessoires" },
  { titre: "Meilleur filet de basket extérieur 2026", produit: "Lifetime filet panier basket extérieur", categorie: "Accessoires" },
  { titre: "Chaussures de basket pour débutant 2026", produit: "Nike Team Hustle D11 basket débutant", categorie: "Chaussures" },
  { titre: "Meilleur débardeur de basket 2026", produit: "Nike Dri-FIT débardeur basket", categorie: "Accessoires" },
  { titre: "Comment choisir sa taille de chaussure de basket", produit: "Nike Air Zoom Crossover basket", categorie: "Chaussures" },
  { titre: "Pompe à ballon de basket notre comparatif", produit: "Spalding pompe ballon basket", categorie: "Accessoires" },
  { titre: "Chaussures de basket montantes vs basses", produit: "Adidas Dame 8 chaussure basket", categorie: "Chaussures" },
  { titre: "Meilleur protège-coude de basket 2026", produit: "McDavid protège-coude basket", categorie: "Accessoires" },
  { titre: "Meilleur tableau de score de basket 2026", produit: "Spalding tableau score basket", categorie: "Accessoires" },
  { titre: "Chaussures de basket pour joueur de pivot 2026", produit: "Nike Zoom Freak 5 pivot basket", categorie: "Chaussures" },
  { titre: "Meilleur sac à dos de basket 2026", produit: "Nike Hoops Elite sac dos basket", categorie: "Accessoires" },
  { titre: "Comment choisir ses semelles pour le basket", produit: "Currex RunPro semelle basket", categorie: "Accessoires" },
  { titre: "Meilleur bracelet de poignet de basket 2026", produit: "Nike bracelet poignet basket", categorie: "Accessoires" },
  { titre: "Chaussures de basket Nike vs Adidas comparatif", produit: "Nike Lebron vs Adidas Harden basket", categorie: "Chaussures" },
  { titre: "Meilleur ballon de basket pour enfant 2026", produit: "Spalding ballon basket enfant taille 5", categorie: "Ballons" },
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
  const disponibles = sujets.filter(s => !existing.includes(slugify(s.titre)));
  if (disponibles.length === 0) return sujets[Math.floor(Math.random() * sujets.length)];
  return disponibles[Math.floor(Math.random() * disponibles.length)];
}

function callClaude(prompt) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
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
          if (parsed.content && parsed.content[0] && parsed.content[0].text) {
            resolve(parsed.content[0].text);
          } else {
            reject(new Error('Réponse inattendue: ' + JSON.stringify(parsed)));
          }
        } catch (e) {
          reject(new Error('Erreur parsing: ' + e.message));
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
  const slug = slugify(sujet.titre);
  const date = getDate();

  console.log(`Génération de l'article : ${sujet.titre}`);

  const articlePrompt = `Tu es un expert en équipement de basket. Rédige un article comparatif SEO en français sur le sujet suivant : "${sujet.titre}".

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

  const articleContent = await callClaude(articlePrompt);

  const frontmatter = `---
title: "${sujet.titre}"
date: "${date}"
description: "Comparatif et guide d'achat pour ${sujet.titre.toLowerCase()}. On vous aide à faire le bon choix selon votre budget et votre niveau."
category: "${sujet.categorie}"
---

`;

  const filePath = path.join(process.cwd(), 'posts', `${slug}.md`);
  fs.writeFileSync(filePath, frontmatter + articleContent);
  console.log(`Article créé : ${filePath}`);

  const produitPrompt = `Tu es un expert en équipement de basket. Pour le produit "${sujet.produit}", génère une courte description de 1 à 2 phrases maximum, percutante et factuelle, pour une fiche produit de boutique en ligne. Pas de tiret. Réponds uniquement avec la description, rien d'autre.`;

  const description = await callClaude(produitPrompt);

  const produit = {
    nom: sujet.produit,
    description: description.trim(),
    categorie: sujet.categorie,
    badge: null,
    lien_amazon: `https://www.amazon.fr/s?k=${encodeURIComponent(sujet.produit)}&tag=sportguidefr-21`,
    lien_article: `/articles/${slug}`,
  };

  const produitPath = path.join(process.cwd(), 'products', `${slug}.json`);
  fs.writeFileSync(produitPath, JSON.stringify(produit, null, 2));
  console.log(`Produit créé : ${produitPath}`);
}

main().catch(console.error);