import React from "react";
import { config } from "../config/pujaConfig";

export const StructuredData: React.FC = () => {
  // 1. WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "umaa (উমা)",
    alternateName: ["umaa.tech", "উমা", "Durga Puja 2026 Player"],
    url: "https://umaa.tech",
    description:
      "ঢাকের তালে, কাশফুলের হাওয়ায়… মা আসছেন। Experience Durga Puja 2026 with an immersive Bengali festive playlist, live countdown, and authentic Agomoni songs.",
    inLanguage: ["bn", "en"],
  };

  // 2. MusicPlaylist Schema
  const musicPlaylistSchema = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    name: "Durga Puja 2026 Agomoni & Festive Playlist (শারদোৎসব ২০২৬ গান)",
    description: "Curated Bengali festive Durga Puja songs and Agomoni melodies.",
    numTracks: config.defaultTracks.length,
    url: "https://umaa.tech",
    track: config.defaultTracks.map((track, idx) => ({
      "@type": "MusicRecording",
      position: idx + 1,
      name: track.title,
      byArtist: {
        "@type": "MusicGroup",
        name: track.artist,
      },
      duration: track.duration ? `PT${track.duration.replace(":", "M")}S` : undefined,
      url: `https://www.youtube.com/watch?v=${track.youtubeId}`,
      image: track.artworkUrl,
      inLanguage: "bn",
    })),
  };

  // 3. Cultural Festival Event Schema
  const festivalSchema = {
    "@context": "https://schema.org",
    "@type": "Festival",
    name: "Durga Puja 2026 (শারদোৎসব ২০২৬)",
    alternateName: "Kolkata Durga Puja 2026",
    description:
      "Grand UNESCO Intangible Cultural Heritage Bengali Festival celebrating Maa Durga's homecoming.",
    startDate: "2026-10-16T00:00:00+05:30",
    endDate: "2026-10-20T23:59:59+05:30",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    location: {
      "@type": "Place",
      name: "Kolkata",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kolkata",
        addressRegion: "West Bengal",
        addressCountry: "IN",
      },
    },
    organizer: {
      "@type": "Organization",
      name: "umaa",
      url: "https://umaa.tech",
    },
  };

  // 4. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "umaa",
    url: "https://umaa.tech",
    logo: "https://umaa.tech/icon.svg",
    sameAs: ["https://umaa.tech"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicPlaylistSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(festivalSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
};
