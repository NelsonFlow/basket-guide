import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BasketGuide — Comparatifs équipement basket",
  description: "Comparatifs et tests indépendants pour choisir le meilleur équipement de basket : chaussures, ballons, accessoires.",
  verification: {
    google: "AS5s1yQ6gGhbh4vafrbITYVegACmTU1BLdgxMWfcmH4",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <header style={{
          borderBottom: "3px solid #111",
          padding: "20px 0",
          marginBottom: "0",
          background: "white",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link href="/" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif", fontWeight: 900, fontSize: "22px", letterSpacing: "-1px", color: "#111" }}>
              BASKET<span style={{ color: "#c0392b" }}>GUIDE</span>
            </Link>
            <nav style={{ display: "flex", gap: "28px" }}>
              {[
                { label: "Accueil", href: "/" },
                { label: "Boutique", href: "/boutique" },
                { label: "Articles", href: "/articles" },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#111",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: "860px", margin: "0 auto", padding: "48px 20px" }}>
          {children}
        </main>

        <footer style={{
          borderTop: "1px solid #e5e5e5",
          padding: "32px 20px",
          marginTop: "80px",
        }}>
          <div style={{ maxWidth: "860px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif", fontWeight: 900, fontSize: "16px", letterSpacing: "-0.5px" }}>
              BASKET<span style={{ color: "#c0392b" }}>GUIDE</span>
            </span>
            <p style={{ color: "#aaa", fontSize: "12px", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
              Partenaire Amazon — © 2026 BasketGuide
            </p>
          </div>
          <div style={{ maxWidth: "860px", margin: "12px auto 0" }}>
            <p style={{ color: "#ccc", fontSize: "11px", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
              En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}