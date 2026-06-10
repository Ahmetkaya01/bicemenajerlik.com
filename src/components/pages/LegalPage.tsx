import type { ReactNode } from "react";

interface LegalSection {
  heading: string;
  content: ReactNode;
}

interface LegalPageProps {
  title: string;
  updatedAt: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPage({ title, updatedAt, intro, sections }: LegalPageProps) {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-3">
            {title}
          </h1>
          <p className="text-silver/60 text-sm">Son güncelleme: {updatedAt}</p>
        </header>

        <p className="text-silver leading-relaxed mb-10">{intro}</p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                {section.heading}
              </h2>
              <div className="text-silver text-sm leading-relaxed space-y-3">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
