import Breadcrumbs from "@components/Breadcrumbs";
import Pagniation from "@components/Pagniation";
import ProjectList from "@components/ProjectList";
import Section from "@components/Section";
import PageDescription from "@components/page-description";
import markdownToHtml from "lib/markdownToHTML";
import { getManyProjects } from "lib/query";
import { useRouter } from "next/router";
import path from "path";
import blog_style from "styles/Blog.module.scss";

export default function ProjectPage({ projects, htmlContent, totalProjects }) {
  // cast category.product as Product
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  
  const description =
    "Với kinh nghiệm thực hiện nhiều dự án lớn nhỏ và năng lực sản xuất mạnh mẽ, công ty chúng tôi tự tin đáp ứng mọi nhu cầu của khách hàng.";
  const keywords = "Thiết bị Giao thông Châu Gia Phát,";
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
        <Pagniation
          currentPage={currentPage}
          productsPerPage={12}
          onPageChange={(page) => {
            router.push(`/du-an/?page=${page}`);
          }}
          totalProducts={totalProjects}
        />
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
  const totalProjects = projects.length;
  const descriptionPath = path.join(
    process.cwd(),
    "data",
    "_posts",
    "du-an.md"
  );
  const htmlContent = await markdownToHtml(descriptionPath);

  return {
    props: { projects, htmlContent, totalProjects },
  };
}
