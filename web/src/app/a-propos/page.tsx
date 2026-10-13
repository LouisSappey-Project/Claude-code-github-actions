import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Le Média Auto publie des conseils pratiques pour les automobilistes : entretien, permis, mobilité.",
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">À propos</h1>
      <div className="space-y-4">
        <p>
          Le Média Auto publie des conseils pratiques pour les automobilistes : entretien de la
          voiture, permis de conduire, mobilité au quotidien.
        </p>
        <p>
          Nos articles sont écrits simplement et sans jargon, pour que chacun puisse comprendre et
          agir facilement.
        </p>
      </div>
    </>
  );
}
