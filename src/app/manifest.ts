import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "umaa (উমা) | Durga Puja 2026 Festive Music Experience",
    short_name: "umaa",
    description: "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন। Immersive Durga Puja 2026 Countdown & Bengali Music Player.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "bn",
    categories: ["music", "entertainment", "culture"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
