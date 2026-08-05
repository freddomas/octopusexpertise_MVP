"use client";

import Link from "next/link";
import { useState, type PointerEvent } from "react";

import { homeContent, pathFor, type Locale } from "@/content/site-content";
import { MotionLayer } from "@/components/motion-layer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

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
          <div className="hero-depth-waves" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-hand hero-hand-left" aria-hidden="true" />
          <div className="hero-hand hero-hand-right" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-eyebrow" data-reveal>
              {copy.eyebrow}
            </p>
            <h1 data-reveal>{copy.hero}</h1>
            <p className="hero-intro" data-reveal>
              {copy.heroIntro}
            </p>
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
                href={pathFor(locale, "devenir-partenaire")}
              >
                {copy.partnerCta}
                <Arrow />
              </Link>
            </div>
            <p className="proof-line" data-reveal>
              {copy.proofLine}
            </p>
          </div>
          <p className="scroll-cue">
            <span />
            Scroll
          </p>
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
          <div className="network-visual" data-reveal aria-hidden="true">
            <div className="network-core">OE</div>
            {copy.networkAxes.map((axis, index) => (
              <span
                className={`network-point network-point-${index + 1}`}
                key={axis}
              >
                {index + 1}
              </span>
            ))}
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
          <div className="territory-map" data-reveal aria-hidden="true">
            <svg
              className="drc-map"
              data-drc-map
              viewBox="0 0 640 520"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="drc-outline"
                d="M116 181 96 160l29-25 35 5 20-23 42 7 29-24 40 16 36-21 36 16 38-10 31 19 12 28 39 10 10 30 36 15-13 32 27 23-20 29 8 31-24 20-2 32-28 17-15 40-27 22-29-11-18 34-34-8-17-35-39 8-25-27-38-3-15-32-36-10-3-37-36-18-21 16-36-10-26-28 10-25 33-5 21-24-22-23 13-32-22-23 12-30Z"
              />
              <path
                className="drc-river"
                d="M425 154c-62 31-68 85-117 99-52 15-97-16-135 7-26 16-35 35-72 31"
              />
              <g className="map-location location-kinshasa">
                <circle className="map-halo" cx="104" cy="291" r="18" />
                <circle className="map-dot" cx="104" cy="291" r="5" />
                <text x="75" y="324">
                  Kinshasa
                </text>
              </g>
              <g className="map-location location-lualaba">
                <circle className="map-halo" cx="348" cy="401" r="18" />
                <circle className="map-dot" cx="348" cy="401" r="5" />
                <text x="276" y="433">
                  Lualaba
                </text>
              </g>
              <g className="map-location location-katanga">
                <circle className="map-halo" cx="438" cy="425" r="18" />
                <circle className="map-dot" cx="438" cy="425" r="5" />
                <text x="455" y="432">
                  Haut-Katanga
                </text>
              </g>
            </svg>
            <span className="map-caption">
              République démocratique du Congo
            </span>
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
