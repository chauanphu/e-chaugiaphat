import PageDescription from "@components/page-description";
import markdownToHtml from "lib/markdownToHTML";
import { GetServerSideProps } from "next";
import path from "path";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";
import Breadcrumbs from "@components/Breadcrumbs";
import StructuredData from "@components/structured-data";
import blog_style from 'styles/Blog.module.scss'

type Props = {
  htmlContent?: string;
};

export default function AboutUs({ htmlContent }: Props) {
  const page_og = {
    url: "gioi-thieu",
  } as OpenGraph;
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/gioi-thieu", label: "Giới thiệu" },
  ];
  return (
    <>
      <PageDescription
        title="Giới thiệu"
        keywords="Đồng phục Trần Gia Phát, Về chúng tôi, Giới thiệu"
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
    "gioi-thieu.md"
  );
  const htmlContent = await markdownToHtml(descriptionPath);
  return {
    props: { htmlContent },
  };
};
