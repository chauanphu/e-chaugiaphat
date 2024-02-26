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
        keywords="Chính sách vận chuyển, Vận chuyển, Châu Gia Phát"
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
    "chinh-sach-van-chuyen.md"
  );
  const htmlContent = await markdownToHtml(descriptionPath);
  return {
    props: { htmlContent },
  };
};
