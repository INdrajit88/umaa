import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { StructuredData } from "../components/StructuredData";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://umaa.tech"),
  title: {
    default: "umaa (উমা) | Durga Puja 2026 Countdown & Festive Music Experience",
    template: "%s | umaa",
  },
  description:
    "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন। Experience Durga Puja 2026 with an immersive Bengali festive playlist, live countdown, ambient visuals, and authentic Agomoni songs on umaa.tech.",
  keywords: [
    "umaa",
    "umaa.tech",
    "উমা",
    "মা আসছেন",
    "Durga Puja 2026",
    "Durga Puja Countdown",
    "Durga Puja Songs",
    "শারদোৎসব ২০২৬",
    "Bengali Music Player",
    "Mahalaya 2026",
    "Agomoni Songs",
    "আগমনী গান",
    "ঢাকের তালে",
    "Dhak Beats",
    "Kolkata Durga Puja 2026",
    "Dugga Elo",
    "Dugga Maa Asche",
    "Pujo Songs Playlist",
    "Arijit Singh Durga Puja",
    "Monali Thakur Pujo Song",
    "Shreya Ghoshal Durga Puja",
  ],
  authors: [{ name: "umaa", url: "https://umaa.tech" }],
  creator: "umaa",
  publisher: "umaa",
  applicationName: "umaa",
  category: "Music & Entertainment",
  classification: "Festivals, Bengali Culture, Music",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  alternates: {
    canonical: "https://umaa.tech",
    languages: {
      "bn-IN": "https://umaa.tech",
      "en-US": "https://umaa.tech",
    },
  },
  openGraph: {
    type: "website",
    locale: "bn_IN",
    alternateLocale: ["en_US"],
    url: "https://umaa.tech",
    siteName: "umaa (উমা)",
    title: "umaa (উমা) | Durga Puja 2026 Countdown & Festive Music Experience",
    description:
      "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন। Live Durga Puja 2026 Countdown & Handpicked Bengali Festive Playlist on umaa.tech.",
  },
  twitter: {
    card: "summary_large_image",
    title: "umaa (উমা) | Durga Puja 2026 Countdown & Festive Music Experience",
    description:
      "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন। Live Durga Puja countdown and Bengali festive songs on umaa.tech.",
    site: "@umaatech",
    creator: "@umaatech",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata, West Bengal, India",
    "geo.position": "22.5726;88.3639",
    ICBM: "22.5726, 88.3639",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "umaa",
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
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <StructuredData />
      </head>
      <body className="antialiased min-h-screen bg-black text-white selection:bg-[#34D399] selection:text-black overflow-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
