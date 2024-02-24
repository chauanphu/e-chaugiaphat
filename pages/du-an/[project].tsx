
import Breadcrumbs from '@components/Breadcrumbs';
import Section from '@components/Section';
import PageDescription from '@components/page-description';
import markdownToHtml from 'lib/markdownToHTML';
import path from 'path';

export default function ProjectDetailPage({htmlContent}) {
  // cast category.product as Product

  const description = 'Trần Gia Phát chuyên may mặc đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động,...'
  const keywords = 'Trần Gia Phát, đồng phục công nhân, đồng phục áo thun, đồng phục đầu bếp, thiết bị bảo hộ lao động'
  const links = [
    {url: "/", label: "Trang chủ"},
    {url: "/du-an", label: "Dự án"}, 
  ]
  return (
    <>
      <PageDescription title='Dự án' description={description} keywords={keywords}/>
      <Breadcrumbs breadcrumbs={links}/>
      <Section title='Dự án'>
        Đang cập nhật
      </Section>
    </>
  );
}

export async function getServerSideProps() {
  // Query all categories with their top 8 products
  const descriptionPath = path.join(
    process.cwd(),
    "data",
    "_posts",
    "du-an.md"
  );
  const htmlContent = await markdownToHtml(descriptionPath);
  return {
    props: {htmlContent},
    // revalidate: 10,
  };
}