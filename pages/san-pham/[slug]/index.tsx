import Section from "@components/Section";
import PageDescription from "@components/page-description";
import { CategoryWithProducts } from "lib/prisma";
import { GetServerSideProps } from "next";
import ProductList from "@components/ProductList";
import { getOneCategoryWithProd } from "lib/query";
import Pagniation from "@components/Pagniation";
import { useRouter } from "next/router";
import Breadcrumbs from "@components/Breadcrumbs";
import { concatMDToHtml } from "lib/markdownToHTML";
import HTMLContent, { HTMLContentProps, HTMLContentTypes } from "@components/HTMLContent";

interface ShopProps {
  category: CategoryWithProducts;
  totalProduct: number;
  htmlContents: HTMLContentProps[];
}

export default function Shop({
  category,
  totalProduct,
  htmlContents,
}: ShopProps) {
  // Get the page number from query
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  const description =
    "Châu Gia Phát luôn khẳng định vị thế là nhà cung cấp uy tín hàng đầu các giải pháp thiết bị an toàn giao thông tại Việt Nam.";
  const keywords =
    "Châu Gia Phát, thiết bị an toàn giao thông, sản phẩm, đèn giao thông, đèn chiếu sáng";

  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/san-pham", label: "Sản phẩm" },
    { url: `/san-pham/${category.slug}`, label: category.name },
  ];
  return (
    <>
      <PageDescription
        title={category.name}
        description={description}
        keywords={keywords}
      />
      <Breadcrumbs breadcrumbs={links} />
      <Section title={category.name}>
        {category.products && (
          <>
            <ProductList
              key={category.slug}
              hasTitle={false}
              category={category}
              products={category.products}
              isCarousel={false}
            />
            <Pagniation
              currentPage={currentPage}
              productsPerPage={12}
              onPageChange={(page) => {
                router.push(`/san-pham/${category.slug}?page=${page}`);
              }}
              totalProducts={totalProduct}
            />
          </>
        )}
      </Section>
      <div className={`container`}>
        {htmlContents.map((content, index) => (
          <HTMLContent key={index} {...content} />
        ))}
      </div>
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug || "";
  const page = context.query.page || 1;
  // Query the category with its top 12 products by slug
  const result = await getOneCategoryWithProd(
    slug as string,
    page as number,
    12
  );
  let htmlContents: HTMLContentProps[] = []
  const category = result.category;
  const totalProduct = result.total;
  const htmlContent = await concatMDToHtml(`${slug}.md`);
  htmlContents.push({ htmlContent, type: HTMLContentTypes.BLOG });
  const contactContent = await concatMDToHtml('lien-he.md');
  htmlContents.push({ htmlContent: contactContent, type: HTMLContentTypes.CONTACT });
  return {
    props: { category, totalProduct, htmlContents },
    // revalidate: 10,
  };
};
