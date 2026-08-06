"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type PointerEvent } from "react";

import { homeContent, pathFor, type Locale } from "@/content/site-content";
import { MotionLayer } from "@/components/motion-layer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HeroCubeAnimation } from "@/features/hero/HeroCubeAnimation";

const territoryRegions = ["Kinshasa", "Lualaba", "Haut-Katanga"] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-eyebrow" data-reveal>
      {children}
    </p>
  );
}

function tilt(event: PointerEvent<HTMLElement>) {
  const node = event.currentTarget;
  const rect = node.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  node.style.setProperty("--tilt-x", `${y * -7}deg`);
  node.style.setProperty("--tilt-y", `${x * 7}deg`);
}

function resetTilt(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--tilt-x", "0deg");
  event.currentTarget.style.setProperty("--tilt-y", "0deg");
}

export function PublicHome({ locale }: { locale: Locale }) {
  const copy = homeContent[locale];
  const [selected, setSelected] = useState(0);
  const active = copy.orchestration[selected];

  return (
    <div className="public-site" data-art-direction="deep-blue-violet">
      <MotionLayer />
      <SiteHeader locale={locale} />

      <main>
        <section className="hero section-shell">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="hero-wave-field" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-hand hero-hand-left" aria-hidden="true" />
          <div className="hero-hand hero-hand-right" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-center">
            <HeroCubeAnimation />
            <div className="hero-copy">
              <h1 data-reveal>{copy.hero}</h1>
            </div>
          </div>
        </section>

        <section
          className="proof-rail"
          aria-label={
            locale === "fr" ? "Preuve opérationnelle" : "Operational proof"
          }
        >
          {copy.operationalProof.map((item, index) => (
            <div key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </div>
          ))}
        </section>

        <section className="value-section section-shell">
          <Eyebrow>{copy.valueEyebrow}</Eyebrow>
          <div className="section-heading split-heading">
            <h2 data-reveal>{copy.valueTitle}</h2>
            <p data-reveal>{copy.valueText}</p>
          </div>
          <div className="pillar-grid">
            {copy.pillars.map(([title, text], index) => (
              <article className="pillar-card" data-reveal key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="orchestration-section section-shell">
          <Eyebrow>{copy.orchestrationEyebrow}</Eyebrow>
          <div className="section-heading">
            <h2 data-reveal>{copy.orchestrationTitle}</h2>
            <p data-reveal>{copy.orchestrationText}</p>
          </div>
          <div className="orchestration-console" data-reveal>
            <div
              className="orchestration-tabs"
              role="tablist"
              aria-label={
                locale === "fr"
                  ? "Étapes d’orchestration"
                  : "Orchestration stages"
              }
            >
              {copy.orchestration.map(([label], index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={selected === index}
                  aria-controls="orchestration-panel"
                  tabIndex={selected === index ? 0 : -1}
                  className={selected === index ? "is-active" : ""}
                  onClick={() => setSelected(index)}
                  key={label}
                >
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {label}
                </button>
              ))}
            </div>
            <div
              className="orchestration-panel"
              id="orchestration-panel"
              role="tabpanel"
            >
              <div className="panel-index">
                {String(selected + 1).padStart(2, "0")}
              </div>
              <h3>{active[0]}</h3>
              <dl>
                {copy.panelLabels.map((label, index) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{active[index + 1]}</dd>
                  </div>
                ))}
              </dl>
              <div className="panel-pulse" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </section>

        <section className="capabilities-section section-shell">
          <Eyebrow>{copy.capabilitiesEyebrow}</Eyebrow>
          <div className="section-heading split-heading">
            <h2 data-reveal>{copy.capabilitiesTitle}</h2>
            <p data-reveal>{copy.capabilitiesText}</p>
          </div>
          <div className="capability-grid">
            {copy.capabilities.map((item, index) => (
              <article
                className="capability-card tilt-card"
                data-reveal
                onPointerMove={tilt}
                onPointerLeave={resetTilt}
                key={item}
              >
                <span className="card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="capability-icon" aria-hidden="true">
                  <span />
                </div>
                <h3>{item}</h3>
                <Link
                  href={pathFor(locale, "expertises")}
                  aria-label={`${item} — ${locale === "fr" ? "voir les expertises" : "view expertise"}`}
                >
                  <Arrow />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="sectors-section">
          <div className="section-shell">
            <Eyebrow>{copy.sectorsEyebrow}</Eyebrow>
            <h2 data-reveal>{copy.sectorsTitle}</h2>
          </div>
          <div className="sector-marquee" data-reveal>
            {[...copy.sectors, ...copy.sectors].map((sector, index) => (
              <span
                aria-hidden={index >= copy.sectors.length}
                key={`${sector}-${index}`}
              >
                {sector}
                <i />
              </span>
            ))}
          </div>
        </section>

        <section className="method-section section-shell">
          <Eyebrow>{copy.methodEyebrow}</Eyebrow>
          <h2 data-reveal>{copy.methodTitle}</h2>
          <div className="method-list">
            {copy.method.map(([title, text], index) => (
              <article data-reveal key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="network-section section-shell">
          <div
            className="partner-dashboard"
            data-partner-dashboard
            data-reveal
            aria-hidden="true"
          >
            <div className="partner-dashboard-bar">
              <span />
              <span />
              <span />
            </div>
            <div className="partner-signal-grid">
              {copy.networkAxes.map((axis, index) => (
                <div
                  className={`partner-signal signal-${index + 1}`}
                  key={axis}
                >
                  <span className="partner-signal-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="partner-signal-plot">
                    <i />
                    <i />
                    <i />
                  </div>
                  <strong>{axis}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="network-copy">
            <Eyebrow>{copy.networkEyebrow}</Eyebrow>
            <h2 data-reveal>{copy.networkTitle}</h2>
            <p data-reveal>{copy.networkText}</p>
            <ul data-reveal>
              {copy.networkAxes.map((axis) => (
                <li key={axis}>{axis}</li>
              ))}
            </ul>
            <Link
              className="text-link"
              href={pathFor(locale, "devenir-partenaire")}
            >
              {copy.partnerCta}
              <Arrow />
            </Link>
          </div>
        </section>

        <section className="territory-section section-shell">
          <div className="territory-copy">
            <Eyebrow>{copy.territoryEyebrow}</Eyebrow>
            <h2 data-reveal>{copy.territoryTitle}</h2>
            <p data-reveal>{copy.territoryText}</p>
          </div>
          <div
            className="territory-map"
            data-reveal
            role="group"
            aria-label={
              locale === "fr"
                ? "Régions couvertes en République démocratique du Congo"
                : "Covered regions in the Democratic Republic of the Congo"
            }
          >
            <Image
              className="drc-map-art"
              data-drc-map-art
              src="/drc-regional-map.webp"
              alt=""
              fill
              sizes="(max-width: 62rem) 92vw, 52vw"
            />
            <div className="map-regions" data-drc-map>
              {territoryRegions.map((region) => (
                <span
                  className={`map-region location-${region.toLowerCase()}`}
                  role="img"
                  aria-label={region}
                  tabIndex={0}
                  key={region}
                >
                  <span className="map-region-core" />
                  <span className="map-region-label">{region}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="platform-section section-shell">
          <div className="platform-copy">
            <Eyebrow>{copy.platformEyebrow}</Eyebrow>
            <h2 data-reveal>{copy.platformTitle}</h2>
            <p data-reveal>{copy.platformText}</p>
            <Link className="text-link" href={pathFor(locale, "plateforme")}>
              {locale === "fr"
                ? "Comprendre la frontière publique"
                : "Understand the public boundary"}
              <Arrow />
            </Link>
          </div>
          <div className="platform-abstract" data-reveal aria-hidden="true">
            <div className="abstract-top">
              <span />
              <span />
              <span />
            </div>
            <div className="abstract-lanes">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
        </section>

        <section className="quality-section section-shell">
          <Eyebrow>{copy.qualityEyebrow}</Eyebrow>
          <h2 data-reveal>{copy.qualityTitle}</h2>
          <div className="quality-grid">
            {copy.quality.map((item, index) => (
              <article data-reveal key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="final-cta section-shell">
          <div className="final-orb" aria-hidden="true" />
          <Eyebrow>{locale === "fr" ? "Prochaine étape" : "Next step"}</Eyebrow>
          <h2 data-reveal>{copy.finalTitle}</h2>
          <p data-reveal>{copy.finalText}</p>
          <div className="hero-actions" data-reveal>
            <Link
              className="button"
              href={pathFor(locale, "confier-un-besoin")}
            >
              {copy.primaryCta}
              <Arrow />
            </Link>
            <Link
              className="button button-ghost"
              href={pathFor(locale, "contact")}
            >
              {copy.contactCta}
              <Arrow />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
