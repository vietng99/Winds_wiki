import { Toc } from "@/components/Toc";
import {
  extractHeadings,
  loadGuideMarkdown,
  renderGuideHtml
} from "@/lib/guide";

function Hero() {
  return (
    <header className="hero-box">
      <p>WWM Analytical Progression Guide</p>
      <h1>Where Winds Meet — Mechanics of Mastery</h1>
      <p>Level 1-50 roadmap • Updated automatically from the master guide</p>
    </header>
  );
}

function Metadata() {
  return (
    <section className="metadata-grid" aria-label="Guide metadata">
      <article className="metadata-card">
        <div className="label">Version</div>
        <div className="value">9.0</div>
      </article>
      <article className="metadata-card">
        <div className="label">Updated</div>
        <div className="value">{new Date().toLocaleDateString()}</div>
      </article>
      <article className="metadata-card">
        <div className="label">Scope</div>
        <div className="value">Temp. Architecture • Raids • Economy • Sects</div>
      </article>
    </section>
  );
}

export default async function Page() {
  const markdown = await loadGuideMarkdown();
  const [html, headings] = await Promise.all([
    renderGuideHtml(markdown),
    extractHeadings(markdown)
  ]);

  return (
    <main>
      <div className="app-shell">
        <article className="guide-card">
          <Hero />
          <Metadata />
          <section
            className="guide-content"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
        <Toc headings={headings} />
      </div>
    </main>
  );
}

