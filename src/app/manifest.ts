import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "umaa (উমা) | Durga Puja Music Experience",
    short_name: "umaa",
    description: "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন। Immersive Durga Puja Music Player.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
