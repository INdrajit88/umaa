import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://umaa.tech"),
  title: "umaa (উমা) | Durga Puja Music Experience",
  description: "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন। Immersive Durga Puja Music Experience on umaa.tech.",
  keywords: [
    "umaa",
    "umaa.tech",
    "Durga Puja",
    "Maa Aschen",
    "Bengali Music",
    "Mahalaya",
    "Agomoni",
    "Dhak",
    "Kolkata Durga Puja",
    "Pujo Songs",
  ],
  authors: [{ name: "umaa" }],
  openGraph: {
    title: "umaa (উমা) | Durga Puja Music Experience",
    description: "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন।",
    url: "https://umaa.tech",
    type: "website",
    locale: "bn_IN",
    siteName: "umaa",
  },
  twitter: {
    card: "summary_large_image",
    title: "umaa (উমা) | Durga Puja Music Experience",
    description: "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন।",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="dark">
      <body className="antialiased min-h-screen bg-black text-white selection:bg-[#34D399] selection:text-black overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
