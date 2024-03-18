import PageDescription from "@components/page-description";
import { concatMDToHtml } from "lib/markdownToHTML";
import { GetServerSideProps } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import Breadcrumbs from "@components/Breadcrumbs";
import blog_style from "styles/Blog.module.scss";
import HTMLContent, { HTMLContentTypes } from "@components/HTMLContent";

type Props = {
  htmlContent?: string;
};

export default function ShippingPolicy({ htmlContent }: Props) {
  const page_og = {
    url: "chinh-sach-van-chuyen",
  } as OpenGraph;
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/chinh-sach-van-chuyen", label: "Chính sách vận chuyển" },
  ];
  return (
    <>
      <PageDescription
        title="Chính sách vận chuyển"
        description="Chính sách vận chuyển của Châu Gia Phát luôn được cập nhật mới nhất. Đảm bảo quyền lợi của khách hàng."
        keywords="Chính sách vận chuyển, Vận chuyển, Châu Gia Phát"
        og={page_og}
      />
      <div className={`container ${blog_style.blog}`}>
        <Breadcrumbs breadcrumbs={links} />
        <HTMLContent htmlContent={htmlContent} type={HTMLContentTypes.BLOG} />
      </div>
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const htmlContent = await concatMDToHtml("chinh-sach-thanh-toan.md");
  return {
    props: { htmlContent },
  };
};
