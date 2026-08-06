import Link from "next/link";

import { MotionLayer } from "@/components/motion-layer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  homeContent,
  pathFor,
  type Locale,
  type PublicPage,
} from "@/content/site-content";

export function ContentPage({
  locale,
  page,
}: {
  locale: Locale;
  page: PublicPage;
}) {
  const copy = homeContent[locale];

  return (
    <div
      className="public-site content-site"
      data-art-direction="deep-blue-violet"
    >
      <MotionLayer />
      <SiteHeader locale={locale} />
      <main>
        <section className="content-hero section-shell">
          <div className="hero-grid" aria-hidden="true" />
          <p className="section-eyebrow" data-reveal>
            {page.eyebrow}
          </p>
          <h1 data-reveal>{page.title}</h1>
          <p className="content-intro" data-reveal>
            {page.intro}
          </p>
        </section>
        <section className="content-sections section-shell">
          {page.sections.map((section, index) => (
            <article data-reveal key={section.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.items ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
          {page.notice ? (
            <aside className="truth-notice" data-reveal>
              <span aria-hidden="true">i</span>
              <p>{page.notice}</p>
            </aside>
          ) : null}
        </section>
        <section className="page-cta section-shell" data-reveal>
          <h2>
            {locale === "fr"
              ? "Un besoin à structurer ?"
              : "A need to structure?"}
          </h2>
          <div>
            <Link
              className="button button-ghost"
              href={pathFor(locale, "contact")}
            >
              {copy.contactCta}
              <span>↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
