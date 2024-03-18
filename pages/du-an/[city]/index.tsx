import Breadcrumbs from "@components/Breadcrumbs";
import Image from "next/image";
import PageDescription from "@components/page-description";
import markdownToHtml, { concatMDToHtml } from "lib/markdownToHTML";
import { getOneProjectBySlug } from "lib/query";
import path from "path";
import blog_style from "styles/Blog.module.scss";
import style from "styles/ProjectDetail.module.scss";
import ProductList from "@components/ProductList";
import { ProjectWithProduct } from "lib/prisma";
import { getAllImagesinFolder } from "lib/requireImage";
import Link from "next/link";

export default function ProjectDetailPage({
  project,
  htmlContent,
  project_html,
  images_url,
}: {
  project: ProjectWithProduct;
  htmlContent: string;
  project_html: string;
  images_url: string[];
}) {
  // cast category.product as Product
  const district = ['Tân An','Bến Lức']
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
          <h2>Châu Gia Phát thi công, lắp đặt đèn tín hiệu giao thông tại các quận/huyện sau:</h2>
          <ul className={style.districts}>
            {district.map((item, index) => (
              <li key={index}>
                <Link href={`/du-an/${project.url}/${item}`}>Đèn tín hiệu giao thông {item}</Link>
              </li>
            ))}
          </ul>
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
  const slug = params?.city || "";
  const project_html = await concatMDToHtml("du-an/" + slug + '.md')
  const project = await getOneProjectBySlug(slug);
  const images_url = await getAllImagesinFolder(`du-an/${slug}` || "").map(
    (image) => slug + "/" + image
  );
  return {
    props: { project, htmlContent, project_html, images_url },
    // revalidate: 10,
  };
}
