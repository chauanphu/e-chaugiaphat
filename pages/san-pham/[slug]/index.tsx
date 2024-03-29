import Section from "@components/Section";
import prisma from "lib/prisma";
import PageDescription from "@components/page-description";
import { CategoryWithProducts } from "lib/prisma";
import { GetServerSideProps } from "next";
import ProductList from "@components/ProductList";
import { getOneCategoryWithProd } from "lib/query";
import Pagniation from "@components/Pagniation";
import { useRouter } from "next/router";
import Breadcrumbs from "@components/Breadcrumbs";
import path from "path";
import markdownToHtml from "lib/markdownToHTML";
import blog_style from "styles/Blog.module.scss";

interface ShopProps {
  category: CategoryWithProducts;
  totalProduct: number;
  htmlContent: string;
  contactContent: string;
}

export default function Shop({
  category,
  totalProduct,
  htmlContent,
  contactContent,
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
      <div className={`container ${blog_style.blog}`}>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent || "Chưa cập nhật" }}
        />
        <div
          className={blog_style.contact}
          dangerouslySetInnerHTML={{
            __html: contactContent || "Chưa cập nhật",
          }}
        />
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
  const category = result.category;
  const totalProduct = result.total;
  const descriptionPath = path.join(
    process.cwd(),
    "data",
    "_posts",
    `${slug}.md`
  );
  const contactPath = path.join(process.cwd(), "data", "_posts", "lien-he.md");
  const htmlContent = await markdownToHtml(descriptionPath);
  const contactContent = await markdownToHtml(contactPath);
  return {
    props: { category, totalProduct, htmlContent, contactContent },
    // revalidate: 10,
  };
};
