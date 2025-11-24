"use client";

type Heading = {
  title: string;
  id: string;
  depth: number;
};

type Props = {
  headings: Heading[];
};

export function Toc({ headings }: Props) {
  return (
    <nav className="toc-card" aria-label="Guide navigation">
      <h2>Contents</h2>
      <ul className="toc-list">
        {headings.map((heading) => (
          <li key={heading.id} className="toc-item">
            <a
              href={`#${heading.id}`}
              className="toc-link"
              data-depth={heading.depth}
            >
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

