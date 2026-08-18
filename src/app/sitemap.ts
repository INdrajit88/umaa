import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://umaa.tech",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
      alternates: {
        languages: {
          bn: "https://umaa.tech",
          en: "https://umaa.tech",
        },
      },
    },
  ];
}
