"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  homeContent,
  navigation,
  pathFor,
  type Locale,
} from "@/content/site-content";

export function SiteHeader({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const copy = homeContent[locale];
  const otherLocale = locale === "fr" ? "en" : "fr";

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <header
      className={`site-header ${compact ? "is-compact" : ""} ${open ? "menu-open" : ""}`}
    >
      <div className="header-inner">
        <Link
          className="brand"
          href={pathFor(locale)}
          aria-label="Octopus Expertise"
        >
          <span className="brand-mark">
            <Image
              src="/octopus-expertise-logo.webp"
              alt=""
              fill
              sizes="192px"
              priority
            />
          </span>
          <span className="brand-name">Octopus Expertise</span>
        </Link>

        <nav
          className="desktop-nav"
          aria-label={
            locale === "fr" ? "Navigation principale" : "Main navigation"
          }
        >
          {navigation[locale].map(([label, slug]) => (
            <Link href={pathFor(locale, slug)} key={slug}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link
            className="utility-link login-link"
            href={pathFor(locale, "connexion")}
          >
            {copy.utility}
          </Link>
          <Link
            className="language-link"
            href={pathFor(otherLocale)}
            hrefLang={otherLocale}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            className="button button-small header-cta"
            href={pathFor(locale, "confier-un-besoin")}
          >
            {copy.primaryCta}
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-label={open ? copy.menuClose : copy.menuOpen}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="mobile-nav" aria-label={copy.mobileNav}>
          <div className="mobile-nav-links">
            {navigation[locale].map(([label, slug], index) => (
              <Link
                href={pathFor(locale, slug)}
                key={slug}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {label}
              </Link>
            ))}
          </div>
          <div className="mobile-nav-actions">
            <Link
              className="button"
              href={pathFor(locale, "confier-un-besoin")}
            >
              {copy.primaryCta}
            </Link>
            <Link
              className="button button-ghost"
              href={pathFor(locale, "devenir-partenaire")}
            >
              {copy.partnerCta}
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
