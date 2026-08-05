import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isLocale } from "@/content/site-content";

import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    title: {
      default: "Octopus Expertise",
      template: "%s · Octopus Expertise",
    },
    description:
      locale === "fr"
        ? "Octopus Expertise structure les besoins complexes, mobilise les capacités pertinentes et coordonne leur exécution."
        : "Octopus Expertise structures complex needs, mobilises relevant capabilities and coordinates their delivery.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
