import PageDescription from "@components/page-description";
import markdownToHtml, { concatMDToHtml } from "lib/markdownToHTML";
import { GetServerSideProps } from "next";
import path from "path";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import Breadcrumbs from "@components/Breadcrumbs";
import StructuredData from "@components/structured-data";
import HTMLContent, { HTMLContentTypes } from "@components/HTMLContent";

type Props = {
  htmlContent?: string;
};

export default function WarrantyPolicy({ htmlContent }: Props) {
  const page_og = {
    url: "chinh-sach-bao-hanh",
  } as OpenGraph;
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/chinh-sach-bao-hanh", label: "Chính sách bảo hành" },
  ];
  return (
    <>
      <PageDescription
        title="Chính sách bảo hành"
        description="Chính sách bảo hành của Châu Gia Phát luôn được cập nhật mới nhất. Đảm bảo quyền lợi của khách hàng."
        keywords="Chính sách bảo hành, Bảo hành, Châu Gia Phát"
        og={page_og}
      />
      <div className={`container`}>
        <Breadcrumbs breadcrumbs={links} />
        <HTMLContent htmlContent={htmlContent} type={HTMLContentTypes.BLOG} />
      </div>
    </>
  );
}

// Config as server side rendering get slug from params
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const htmlContent = await concatMDToHtml('chinh-sach-bao-hanh.md');
  return {
    props: { htmlContent },
  };
};
