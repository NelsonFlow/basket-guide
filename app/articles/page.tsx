"" 
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Articles() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(fileContent);
    return { slug, ...data };
  }) as { slug: string; title: string; date: string; description: string; category?: string }[];

  const sorted = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <p style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          fontSize: "11px",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "#c0392b",
          marginBottom: "10px"
        }}>
          Tous les articles
        </p>
        <h1 style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
          fontSize: "32px",
          fontWeight: 900,
          letterSpacing: "-1px",
        }}>
          Comparatifs et guides basket
        </h1>
      </div>

      <div>
        {sorted.map((post) => (
          <Link key={post.slug} href={`/articles/${post.slug}`}>
            <div className="article-card">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <span className="category-tag">{post.category || "Comparatif"}</span>
                <span className="article-meta">{post.date}</span>
              </div>
              <h2 className="article-title">{post.title}</h2>
              <p className="article-desc">{post.description}</p>
              <p style={{
                marginTop: "12px",
                fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#c0392b",
              }}>
                Lire le comparatif →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}