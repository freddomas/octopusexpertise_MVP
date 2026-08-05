import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PublicHome } from "@/components/public-home";
import { isLocale } from "@/content/site-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title:
      locale === "fr"
        ? "Orchestration de capacités B2B"
        : "B2B capability orchestration",
    description:
      locale === "fr"
        ? "Un interlocuteur unique pour cadrer, mobiliser et coordonner les capacités nécessaires à votre mission."
        : "One point of contact to frame, mobilise and coordinate the capabilities your mission requires.",
    alternates: { languages: { fr: "/fr", en: "/en" } },
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PublicHome locale={locale} />;
}
