import { promises as fs } from "fs";
import path from "path";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import remarkSlug from "remark-slug";
import GithubSlugger from "github-slugger";

export type Heading = {
  title: string;
  id: string;
  depth: number;
};

const GUIDE_PATH = path.join(process.cwd(), "content", "guide.md");

export async function loadGuideMarkdown() {
  const file = await fs.readFile(GUIDE_PATH, "utf8");
  return file;
}

export async function renderGuideHtml(markdown: string) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkSlug)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return processed.toString();
}

export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  const headings: Heading[] = [];

  for (const line of lines) {
    const match = /^(#{1,4})\s+(.*)/.exec(line.trim());
    if (match) {
      const depth = match[1].length;
      const title = match[2].trim();
      const id = slugger.slug(title);
      headings.push({ title, id, depth });
    }
  }

  return headings;
}

