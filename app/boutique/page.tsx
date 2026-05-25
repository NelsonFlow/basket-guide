import fs from "fs";
import path from "path";
import Link from "next/link";

type Produit = {
  nom: string;
  description: string;
  categorie: string;
  badge: string | null;
  lien_amazon: string;
  lien_article: string;
};

export default function Boutique() {
  const productsDir = path.join(process.cwd(), "products");
  const files = fs.readdirSync(productsDir).filter(f => f.endsWith(".json"));

  const produits: Produit[] = files.map((filename) => {
    const content = fs.readFileSync(path.join(productsDir, filename), "utf-8");
    return JSON.parse(content);
  });

  const categories = ["Chaussures", "Ballons", "Accessoires"];

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

      {categories.map((categorie) => {
        const items = produits.filter(p => p.categorie === categorie);
        if (items.length === 0) return null;

        return (
          <div key={categorie} style={{ marginBottom: "64px" }}>
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
              {categorie}
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "20px",
            }}>
              {items.map((produit) => (
                <div key={produit.nom} style={{
                  background: "white",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}>
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

                  
                   <a href={produit.lien_amazon}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: "#111",
                      color: "white",
                      textAlign: "center",
                      padding: "10px",
                      borderRadius: "6px",
                      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      textDecoration: "none",
                      display: "block",
                    }}
                  >
                    Voir sur Amazon
                  </a>

                  <Link
                    href={produit.lien_article}
                    style={{
                      textAlign: "center",
                      fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#c0392b",
                      textDecoration: "none",
                    }}
                  >
                    Lire le comparatif →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}

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