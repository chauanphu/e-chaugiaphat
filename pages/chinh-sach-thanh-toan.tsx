import PageDescription from "@components/page-description";
import markdownToHtml from "lib/markdownToHTML";
import { GetServerSideProps } from "next";
import path from "path";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import Breadcrumbs from "@components/Breadcrumbs";
import blog_style from 'styles/Blog.module.scss'

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
        keywords="Chính sách thanh toán, Thanh toán, Châu Gia Phát"
        og={page_og}
      />
      <div className={`container ${blog_style.blog}`}>
        <Breadcrumbs breadcrumbs={links} />
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent || "Chưa cập nhật" }}
        />
      </div>
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const descriptionPath = path.join(
    process.cwd(),
    "data",
    "_posts",
    "chinh-sach-thanh-toan.md"
  );
  const htmlContent = await markdownToHtml(descriptionPath);
  return {
    props: { htmlContent },
  };
};
