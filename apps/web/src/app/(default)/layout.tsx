import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../globals.css";

export const metadata: Metadata = {
  title: "Octopus Expertise",
  description:
    "Octopus Expertise structure les besoins complexes, mobilise les capacités pertinentes et coordonne leur exécution.",
};

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
