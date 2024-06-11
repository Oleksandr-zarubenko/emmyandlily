import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // {
    //   url: process.env.HOSTNAME || "https://www.emmyandlily.com",
    //   lastModified: new Date(),
    //   changeFrequency: "yearly",
    //   priority: 1,
    // },
    {
      url: `${process.env.HOSTNAME || "https://www.emmyandlily.com"}/ua`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${process.env.HOSTNAME || "https://www.emmyandlily.com"}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
