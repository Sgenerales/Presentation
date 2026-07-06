import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITC TOWER — Edificio Corporativo · Santa Cruz de la Sierra",
  description:
    "Torre corporativa de gestión privada en Equipetrol Norte, Santa Cruz de la Sierra. Espacios ejecutivos en arrendamiento, plantas libres de columnas y servicios integrados para operaciones que requieren presencia y continuidad.",
  keywords: [
    "ITC Tower",
    "oficinas corporativas Santa Cruz",
    "alquiler oficinas Bolivia",
    "Equipetrol Norte",
    "edificio corporativo",
  ],
  openGraph: {
    title: "ITC TOWER — Edificio Corporativo",
    description:
      "Torre corporativa de gestión privada con espacios ejecutivos en arrendamiento, servicios integrados y ubicación estratégica en Equipetrol Norte.",
    type: "website",
    locale: "es_BO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}
    >
      <body className="min-h-screen bg-ink text-bone font-sans">
        {children}
      </body>
    </html>
  );
}
