const produits = [
  {
    categorie: "Chaussures",
    items: [
      {
        nom: "Nike Air Zoom G.T. Cut 3",
        description: "La référence pour les gardes et ailiers. Amorti excellent, accroche parfaite.",
        lien: "https://www.amazon.fr/s?k=Nike+Air+Zoom+GT+Cut+3&tag=sportguidefr-21",
        emoji: "👟",
        badge: "Bestseller",
      },
      {
        nom: "Adidas Harden Vol. 8",
        description: "Conçue pour les meneurs créatifs. Excellent support latéral et semelle très adhérente.",
        lien: "https://www.amazon.fr/s?k=Adidas+Harden+Vol+8&tag=sportguidefr-21",
        emoji: "👟",
        badge: "Top choix",
      },
      {
        nom: "New Balance TWO WXY v4",
        description: "Légère, réactive, idéale pour les pieds larges. Excellent rapport qualité/prix.",
        lien: "https://www.amazon.fr/s?k=New+Balance+TWO+WXY+v4&tag=sportguidefr-21",
        emoji: "👟",
        badge: "Rapport qualité/prix",
      },
      {
        nom: "Nike LeBron NXXT Gen",
        description: "Volume intérieur généreux, amorti Air premium. Parfaite pour les pieds larges.",
        lien: "https://www.amazon.fr/s?k=Nike+LeBron+NXXT+Gen&tag=sportguidefr-21",
        emoji: "👟",
        badge: null,
      },
    ],
  },
  {
    categorie: "Ballons",
    items: [
      {
        nom: "Spalding Street Phantom",
        description: "Le classique de la rue. Robuste, excellente accroche sur tous les terrains outdoor.",
        lien: "https://www.amazon.fr/s?k=Spalding+Street+Phantom&tag=sportguidefr-21",
        emoji: "🏀",
        badge: "Outdoor",
      },
      {
        nom: "Wilson Evolution Indoor",
        description: "La référence des ligues universitaires. Cuir composite premium, toucher exceptionnel.",
        lien: "https://www.amazon.fr/s?k=Wilson+Evolution+Indoor&tag=sportguidefr-21",
        emoji: "🏀",
        badge: "Indoor",
      },
      {
        nom: "Molten BGF7X",
        description: "Le ballon officiel de la FIBA. Standard de compétition internationale.",
        lien: "https://www.amazon.fr/s?k=Molten+BGF7X&tag=sportguidefr-21",
        emoji: "🏀",
        badge: "Compétition",
      },
    ],
  },
  {
    categorie: "Accessoires",
    items: [
      {
        nom: "McDavid 6440 Hex Knee Pad",
        description: "La genouillère préférée des joueurs NBA. Protection chocs et maintien parfait.",
        lien: "https://www.amazon.fr/s?k=McDavid+6440+Hex+Knee+Pad&tag=sportguidefr-21",
        emoji: "🦵",
        badge: "Pro",
      },
      {
        nom: "Nike Elite Crew Basketball",
        description: "La chaussette de référence. Rembourrage Dri-FIT, compression à la voûte plantaire.",
        lien: "https://www.amazon.fr/s?k=Nike+Elite+Crew+Basketball&tag=sportguidefr-21",
        emoji: "🧦",
        badge: null,
      },
      {
        nom: "Nike Brasilia 9.5 Duffel",
        description: "Grande capacité, compartiment chaussures ventilé, matière résistante à l'eau.",
        lien: "https://www.amazon.fr/s?k=Nike+Brasilia+9.5+Training+Duffel&tag=sportguidefr-21",
        emoji: "🎒",
        badge: null,
      },
    ],
  },
];

export default function Boutique() {
  return (
    <div>
      <div style={{ marginBottom: "48px" }}>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#c0392b",
          marginBottom: "10px",
        }}>
          Sélection BasketGuide
        </p>
        <h1 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          fontSize: "32px",
          fontWeight: 900,
          letterSpacing: "-1px",
          marginBottom: "12px",
        }}>
          Notre boutique
        </h1>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          fontSize: "16px",
          color: "#666",
        }}>
          Une sélection des meilleurs produits basket, disponibles sur Amazon.
        </p>
      </div>

      {produits.map((section) => (
        <div key={section.categorie} style={{ marginBottom: "64px" }}>
          <h2 style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
            fontSize: "18px",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "1px",
            borderBottom: "3px solid #111",
            paddingBottom: "10px",
            marginBottom: "24px",
          }}>
            {section.categorie}
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
          }}>
            {section.items.map((produit) => (
              
                <a key={produit.nom}
                href={produit.lien}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={{
                  background: "white",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  padding: "24px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: "40px", textAlign: "center", padding: "16px 0" }}>
                    {produit.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    {produit.badge && (
                      <span style={{
                        display: "inline-block",
                        background: "#fff3e8",
                        color: "#c0392b",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "3px 8px",
                        borderRadius: "3px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        marginBottom: "8px",
                        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                      }}>
                        {produit.badge}
                      </span>
                    )}
                    <h3 style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                      fontSize: "16px",
                      fontWeight: 700,
                      marginBottom: "8px",
                      lineHeight: "1.3",
                    }}>
                      {produit.nom}
                    </h3>
                    <p style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: "1.5",
                    }}>
                      {produit.description}
                    </p>
                  </div>
                  <div style={{
                    background: "#111",
                    color: "white",
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "6px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                  }}>
                    Voir sur Amazon
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: "48px",
        borderTop: "1px solid #eee",
        paddingTop: "24px",
        fontSize: "12px",
        color: "#aaa",
        fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
      }}>
        En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises. Cela ne change pas le prix que vous payez.
      </div>
    </div>
  );
}