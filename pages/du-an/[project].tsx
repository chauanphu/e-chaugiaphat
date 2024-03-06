import Breadcrumbs from "@components/Breadcrumbs";
import Image from "next/image";
import PageDescription from "@components/page-description";
import markdownToHtml from "lib/markdownToHTML";
import { getOneProjectBySlug } from "lib/query";
import path from "path";
import blog_style from "styles/Blog.module.scss";
import ProductList from "@components/ProductList";
import { ProjectWithProduct } from "lib/prisma";

export default function ProjectDetailPage({
  project,
  htmlContent,
}: {
  project: ProjectWithProduct;
  htmlContent: string;
}) {
  // cast category.product as Product

  const description = project?.description || "Chưa cập nhật";
  const keywords =
    "Châu Gia Phát, thiết bị an toàn giao thông, dự án, dự án đã làm, dự án đã thực hiện";
  const links = [
    { url: "/", label: "Trang chủ" },
    { url: "/du-an", label: "Dự án" },
    { url: `/du-an/${project?.url}`, label: project?.name },
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
          <h1>{project.name}</h1>
          <Image
            src={
              project.image_url ? "/api/images/du-an/" + project.image_url : ""
            }
            alt={project.name}
            width={300}
            height={300}
            priority={true}
            // style= {{width: "100%", height: "auto"}}
          />
          <p>
            {project.description}
          </p>
          <h1>Sản phẩm cho dự án</h1>
          <ProductList products={project.products}/>
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
  const slug = params?.project || "";
  const project = await getOneProjectBySlug(slug);
  return {
    props: { project, htmlContent },
    // revalidate: 10,
  };
}
