import PageDescription from "@components/page-description";
import { concatMDToHtml } from "lib/markdownToHTML";
import { GetServerSideProps } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import Breadcrumbs from "@components/Breadcrumbs";
import blog_style from 'styles/Blog.module.scss'
import HTMLContent, { HTMLContentTypes } from "@components/HTMLContent";

type Props = {
  htmlContent?: string;
};

export default function PaymentPolicy({ htmlContent }: Props) {
  const page_og = {
    url: "chinh-sach-thanh-toan",
  } as OpenGraph;
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/chinh-sach-thanh-toan", label: "Chính sách thanh toán" },
  ];
  return (
    <>
      <PageDescription
        title="Chính sách thanh toán"
        description="Chính sách thanh toán của Châu Gia Phát luôn được cập nhật mới nhất. Đảm bảo quyền lợi của khách hàng."
        keywords="Chính sách thanh toán, Thanh toán, Châu Gia Phát"
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
export const getServerSideProps: GetServerSideProps = async ({ }) => {
  const htmlContent = await concatMDToHtml('chinh-sach-thanh-toan.md');
  return {
    props: { htmlContent },
  };
};
