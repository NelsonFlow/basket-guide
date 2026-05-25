import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);
  return files.map((filename) => ({
    slug: filename.replace(".md", ""),
  }));
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const processed = await remark().use(html).process(content);
  const contentHtml = processed.toString();

  return (
    <div>
      <p style={{ color: "#c0392b", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "12px", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>{data.category || "Comparatif"}</p>
      <article>
        <h1>{data.title}</h1>
        <p style={{ color: "#999", fontSize: "13px", marginBottom: "32px", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>{data.date}</p>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
      <div style={{ marginTop: "48px", background: "#fafafa", border: "1px solid #eee", borderRadius: "6px", padding: "16px", fontSize: "12px", color: "#aaa", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
        En tant que Partenaire Amazon, je réalise un bénéfice sur les achats remplissant les conditions requises. Cela ne change pas le prix que vous payez.
      </div>
    </div>
  );
}