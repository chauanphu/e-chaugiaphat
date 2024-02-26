import { getAllProductSlugs, getAllProjectSlugs } from "lib/query";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = process.env.NEXT_PUBLIC_DOMAIN as string;
  const productSlugs = await getAllProductSlugs();
  const _categorySlugs = productSlugs.map((slug) => ({
    url: host + "/san-pham/" + slug,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));
  const _projectSlugs = (await getAllProjectSlugs()).map(
    (slug) => ({
      url: host + "/du-an/" + slug,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  ) as MetadataRoute.Sitemap;
  const categorySlugs = _categorySlugs as MetadataRoute.Sitemap;

  return [
    // Add routes
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: host + "/san-pham",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ...categorySlugs,
    {
      url: host + "/du-an",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    ..._projectSlugs,
    {
      url: host + "/gioi-thieu",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: host + "/chinh-sach-bao-hanh",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: host + "/chinh-sach-van-chuyen",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: host + "/chinh-sach-thanh-toan",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
export const dynamic = "force-dynamic";
