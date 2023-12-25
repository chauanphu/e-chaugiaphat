import Head from "next/head";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export interface IPageDescription {
  title: string;
  description?: string;
  keywords: string;
  domain?: string;
  og?: OpenGraph;
}

export default function PageDescription({
  title = "Trang chủ",
  description = "Châu Gia Phát - Công ty #1 Việt Nam về đèn giao thông, đèn chiếu sáng, biển báo hiệu,...",
  keywords = "Đèn giao thông, thiết bị an toàn giao thông, Châu Gia Phát",
  domain = process.env.NEXT_PUBLIC_DOMAIN,
  og,
}: IPageDescription) {
  const msg = `${title} - Cơ khí Châu Gia Phát`;
  return (
    <Head key="page-description">
      <title>{msg}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="generator" content="Nextjs" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {/* Set OG */}
      <meta property="og:type" content={"web"} />
      <meta
        property="og:title"
        content={og?.title ? (og.title as string) : "Cơ khí Châu Gia Phát"}
      />
      {og?.images ? (
        <meta
          property="og:image"
          content={`${domain}/api/images/banner/${og.images}`}
        />
      ) : (
        <meta
          property="og:image"
          content={`${domain}/api/images/banner/banner-1.webp`}
        />
      )}
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${domain}/${og?.url ? og.url : ""}`} />
      <meta property="og:locale" content="vi" />
      <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN} />
      {/*  */}
    </Head>
  );
}
