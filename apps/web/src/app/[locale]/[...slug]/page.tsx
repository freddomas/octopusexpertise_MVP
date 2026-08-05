import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentPage } from "@/components/content-page";
import { getPublicPage, isLocale } from "@/content/site-content";

type RouteParams = { locale: string; slug: string[] };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = getPublicPage(locale, slug.join("/"));
  if (!page) return {};
  return { title: page.eyebrow, description: page.intro };
}

export default async function PublicContentRoute({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = getPublicPage(locale, slug.join("/"));
  if (!page) notFound();
  return <ContentPage locale={locale} page={page} />;
}
