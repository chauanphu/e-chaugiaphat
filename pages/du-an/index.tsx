import Breadcrumbs from "@components/Breadcrumbs";
import ProjectList from "@components/ProjectList";
import Section from "@components/Section";
import PageDescription from "@components/page-description";
import { getManyCategoryWithProd, getManyProjects } from "lib/query";

export default function ProjectPage({ projects }) {
  // cast category.product as Product

  const description =
    "Trần Gia Phát chuyên may mặc đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động,...";
  const keywords =
    "Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động";
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
    </>
  );
}

export async function getServerSideProps() {
  // Query all categories with their top 8 products
  const projects = await getManyProjects();
  return {
    props: { projects },
    // revalidate: 10,
  };
}
