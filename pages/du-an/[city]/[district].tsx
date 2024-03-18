import Breadcrumbs from "@components/Breadcrumbs";
import Image from "next/image";
import PageDescription from "@components/page-description";
import markdownToHtml, { concatMDToHtml } from "lib/markdownToHTML";
import { getOneProjectBySlug, getOneProjectWithDistrict } from "lib/query";
import path from "path";
import blog_style from "styles/Blog.module.scss";
import style from "styles/ProjectDetail.module.scss";
import ProductList from "@components/ProductList";
import { ProjectWithProductDistrict } from "lib/prisma";
import { getAllImagesinFolder } from "lib/requireImage";

export default function ProjectDetailPage({
  project,
  htmlContent,
  project_html,
  images_url,
}: {
  project: ProjectWithProductDistrict;
  htmlContent: string;
  project_html: string;
  images_url: string[];
}) {
  // cast category.product as Product

  const description = project?.description || "Chưa cập nhật";
  const keywords =
    "Châu Gia Phát, thiết bị an toàn giao thông, dự án, dự án đã làm, dự án đã thực hiện";
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/du-an", label: "Dự án" },
    { url: `/du-an/${project?.url}`, label: project?.name },
    { url: `/du-an/${project?.districts[0].slug}`, label: project?.districts[0].name },
  ];
  return (
    <>
      <PageDescription
        title="Dự án"
        description={description}
        keywords={keywords}
      />
      <Breadcrumbs breadcrumbs={links} />
      {project && (
        <div className="container">
          <h1>{project.districts[0].name}</h1>
          <div className={style.imageGrid}>
            {images_url &&
              images_url.map((image, index) => (
                <Image
                  key={index}
                  src={"/api/images/du-an/" + image}
                  alt={project.name}
                  width={300}
                  height={300}
                  priority={true}
                />
              ))}
          </div>
          <div
            className={blog_style.blog}
            dangerouslySetInnerHTML={{ __html: project_html || "Chưa cập nhật" }}
          />
          <h1>Sản phẩm cho dự án</h1>
          <ProductList products={project.products} />
          <div
            className={blog_style.blog}
            dangerouslySetInnerHTML={{ __html: htmlContent || "Chưa cập nhật" }}
          />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps({ params }) {
  // Query all categories with their top 8 products
  const descriptionPath = path.join(
    process.cwd(),
    "data",
    "_posts",
    "du-an.md"
  );
  const htmlContent = await markdownToHtml(descriptionPath);
  const project_html = await concatMDToHtml(params?.city || "")
  const slug = params?.city || "";
  const district_url = params?.district || "";
  const project = await getOneProjectWithDistrict(slug, district_url);
  const images_url = await getAllImagesinFolder(`du-an/${slug}` || "").map(
    (image) => slug + "/" + image
  );
  return {
    props: { project, htmlContent, project_html, images_url },
    // revalidate: 10,
  };
}
