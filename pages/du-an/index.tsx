import Breadcrumbs from "@components/Breadcrumbs";
import ProjectList from "@components/ProjectList";
import Section from "@components/Section";
import PageDescription from "@components/page-description";
import markdownToHtml from "lib/markdownToHTML";
import { getManyCategoryWithProd, getManyProjects } from "lib/query";
import path from "path";
import blog_style from "styles/Blog.module.scss";

export default function ProjectPage({ projects, htmlContent }) {
  // cast category.product as Product

  const description =
    "Với kinh nghiệm thực hiện nhiều dự án lớn nhỏ và năng lực sản xuất mạnh mẽ, công ty chúng tôi tự tin đáp ứng mọi nhu cầu của khách hàng.";
  const keywords =
    "Châu Gia Phát,";
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/du-an", label: "Dự án" },
  ];
  return (
    <>
      <PageDescription
        title="Dự án"
        description={description}
        keywords={keywords}
      />
      <Breadcrumbs breadcrumbs={links} />
      <Section title="Dự án">
        {projects && <ProjectList projects={projects} isCarousel={false} />}
      </Section>
      <div className={`container ${blog_style.blog}`}>
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent || "Chưa cập nhật" }}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const projects = await getManyProjects();
  const descriptionPath = path.join(
    process.cwd(),
    "data",
    "_posts",
    "du-an.md"
  );
  const htmlContent = await markdownToHtml(descriptionPath);
  
  return {
    props: { projects, htmlContent },
  };
}
