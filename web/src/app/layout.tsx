import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Le Média Auto", template: "%s | Le Média Auto" },
  description: "Conseils et actualités pour les automobilistes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <nav className="mx-auto flex max-w-3xl items-center gap-6 px-4 py-4">
            <Link href="/" className="font-semibold">
              Le Média Auto
            </Link>
            <Link href="/a-propos" className="hover:underline">
              À propos
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
