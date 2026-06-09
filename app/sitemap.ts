import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function sitemap() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const articles = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(fileContent);
    return {
      url: `https://www.nelsonkem.cloud/articles/${slug}`,
      lastModified: new Date(data.date),
    };
  });

  return [
    { url: "https://www.nelsonkem.cloud", lastModified: new Date() },
    { url: "https://www.nelsonkem.cloud/articles", lastModified: new Date() },
    { url: "https://www.nelsonkem.cloud/boutique", lastModified: new Date() },
    ...articles,
  ];
}