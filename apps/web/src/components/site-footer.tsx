import Link from "next/link";

import { homeContent, pathFor, type Locale } from "@/content/site-content";

export function SiteFooter({ locale }: { locale: Locale }) {
  const copy = homeContent[locale];
  const legal =
    locale === "fr"
      ? [
          ["Confidentialité", "confidentialite"],
          ["Conditions d’utilisation", "conditions-utilisation"],
        ]
      : [
          ["Privacy", "confidentialite"],
          ["Terms of use", "conditions-utilisation"],
        ];

  return (
    <footer className="site-footer">
      <div className="footer-orbit" aria-hidden="true" />
      <div className="footer-grid">
        <div>
          <p className="footer-brand">Octopus Expertise</p>
          <p className="footer-statement">{copy.footerStatement}</p>
        </div>
        <div className="footer-column">
          <p className="footer-label">
            {locale === "fr" ? "Contact" : "Contact"}
          </p>
          <a href="mailto:info@octopusexpertise.com">
            info@octopusexpertise.com
          </a>
          <a href="tel:+32485368803">+32 485 36 88 03</a>
          <a href="tel:+243974849528">+243 974 849 528</a>
        </div>
        <div className="footer-column">
          <p className="footer-label">{locale === "fr" ? "Accès" : "Access"}</p>
          <Link href={pathFor(locale, "lualaba")}>Lualaba</Link>
          <Link href={pathFor(locale, "haut-katanga")}>Haut-Katanga</Link>
          <Link href={pathFor(locale, "plateforme")}>
            {locale === "fr" ? "Plateforme" : "Platform"}
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Octopus Expertise</p>
        <div>
          {legal.map(([label, slug]) => (
            <Link href={pathFor(locale, slug)} key={slug}>
              {label}
            </Link>
          ))}
        </div>
      </div>
      <p className="footer-wordmark" aria-hidden="true">
        OCTOPUS
      </p>
    </footer>
  );
}
