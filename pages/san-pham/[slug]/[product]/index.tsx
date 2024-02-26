import PageDescription from "@components/page-description";
import { GetServerSideProps } from "next";
import { getManyRelatedProduct, getOneProductBySlug } from "lib/query";
import { getContact } from "lib/utils";
import { ProductWithCategory } from "lib/prisma";
import StarRatings from "react-rating-stars-component";

import { Product } from "@prisma/client";
import Image from "next/image";
import styles from "styles/SinglePageProduct.module.scss";
import Link from "next/link";
import phone_icon from "public/images/phone-icon.png";
import MyCarousel from "@components/MyCarousel";
import ProductCard from "@components/ProductCard";
import path from "path";
import markdownToHtml from "lib/markdownToHTML";
import StructuredData from "@components/structured-data";
import Breadcrumbs from "@components/Breadcrumbs";

import blog_style from "styles/Blog.module.scss";

type Props = {
  product?: ProductWithCategory;
  related_products?: ProductWithCategory[];
  descriptionContent?: string;
  contactContent?: string;
};

export default function SinglePageProduct({
  product,
  related_products,
  descriptionContent,
  contactContent,
}: Props) {
  const description = product?.short_description
    ? product.short_description
    : "";
  const keywords =
    "Châu Gia Phát, thiết bị an toàn giao thông, sản phẩm, đèn giao thông, đèn chiếu sáng";
  const contact = getContact();
  // Add structured data for product
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.name,
    image: product?.image
      ? [
          `${process.env.NEXT_PUBLIC_DOMAIN}/api/images/san-pham/${product?.image}`,
        ]
      : [],
    description: product?.short_description,
    sku: product?.sku,
    mpn: product?.sku,
    // availability
    brand: {
      "@type": "Brand",
      name: "None",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product?.rating ? product?.rating : 4.5,
      reviewCount: 689,
    },
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/san-pham/${product?.categorySlug}/${product?.slug}`,
      sku: product?.sku,
      priceCurrency: "VND",
      price: product?.price,
      priceValidUntil: "2050-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: contact.company_name,
      },
    },
  };
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/san-pham", label: "Sản phẩm" },
    {
      url: `/san-pham/${product?.categorySlug}`,
      label: product?.category.name as string,
    },
    {
      url: `/san-pham/${product?.categorySlug}/${product?.slug}`,
      label: product?.name as string,
    },
  ];
  return (
    <>
      <StructuredData data={structuredData} />
      <PageDescription
        title={product ? product.name : "Sản phẩm"}
        description={description}
        keywords={keywords}
      />
      <Breadcrumbs breadcrumbs={links} />
      {product && (
        <section className="container">
          <div className={styles.SinglePageProduct}>
            <Image
              src={
                product.image
                  ? "/api/images/san-pham/" + product.image
                  : "api/images/placeholder.webp"
              }
              alt={product.name}
              width={300}
              height={300}
              className={styles.mainImage}
            />
            <div className={styles.productInfo}>
              <h1>{product.name}</h1>
              <p className={styles.available}>CÒN HÀNG</p>
              <p className={styles.price}>
                {/* {product.price.toLocaleString("en-US")} đ */}
                Liên hệ để nhận báo giá
              </p>
              <span className={styles.rating}>
                <StarRatings
                  value={product.rating ? product.rating : 4.5}
                  numberOfStars={5}
                  name="rating"
                  editing={false}
                />
                ({product.rating ? product.rating : 4.5})
              </span>
              {product.short_description && (
                <p className={styles.description}>
                  {product.short_description}
                </p>
              )}
              <div className={styles.contacts}>
                <Link href="tel:0945316280">
                  <Image src={phone_icon} alt="Icon" width={30} height={30} />
                  <div className={styles.contactInfo}>
                    <p>GỌI NGAY {contact.phone.display}</p>
                    <p>Để đặt hàng</p>
                  </div>
                  {/* <p>Để được tư vấn và đặt hàng</p> */}
                </Link>
              </div>
            </div>
          </div>
          <h1>Mô tả</h1>
            <div
              className={blog_style.blog}
              dangerouslySetInnerHTML={{
                __html: descriptionContent || "Chưa cập nhật",
              }}
            />
            <div
              className={blog_style.contact}
              dangerouslySetInnerHTML={{
                __html: contactContent || "Chưa cập nhật",
              }}
            />
          {related_products && related_products.length > 0 && (
            <>
              <h1>Sản phẩm tương tự</h1>
              <MyCarousel>
                {related_products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </MyCarousel>
            </>
          )}
        </section>
      )}
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.product || "";
  // // Query the category with its top 8 products by slug
  const product = await getOneProductBySlug(slug as string);
  var related_products: Product[] | null = [];
  if (product !== null) {
    related_products = await getManyRelatedProduct(
      product?.categorySlug,
      product?.slug
    );
  }
  const descriptionPath = path.join(
    process.cwd(),
    "data",
    "_posts",
    "san-pham",
    `${product?.slug}.md`
  );
  const contactPath = path.join(process.cwd(), "data", "_posts", "lien-he.md");
  const descriptionContent = await markdownToHtml(descriptionPath);
  const contactContent = await markdownToHtml(contactPath);
  return {
    props: { product, related_products, descriptionContent, contactContent },
    // revalidate: 10,
  };
};
