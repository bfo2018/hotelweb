import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelweb.vercel.app"),
  title: {
    default: "Lumière & Stone | Boutique Hotel",
    template: "%s | Lumière & Stone",
  },
  description:
    "Experience refined luxury at Lumière & Stone Boutique Hotel in Tikamgarh, Madhya Pradesh. Elegant rooms, dining, events, and personalized service.",
  keywords: [
    "boutique hotel",
    "luxury hotel",
    "Lumière & Stone",
    "hotel booking",
    "Tikamgarh",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Lumière & Stone Boutique Hotel",
    title: "Lumière & Stone | Boutique Hotel",
    description:
      "Experience refined luxury at Lumière & Stone Boutique Hotel in Tikamgarh.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-secondary text-neutral">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
