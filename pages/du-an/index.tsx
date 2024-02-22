
import Breadcrumbs from '@components/Breadcrumbs';
import ProductList from '@components/ProductList';
import Section from '@components/Section';
import PageDescription from '@components/page-description';
import { Product } from '@prisma/client';
import { CategoryWithProducts } from 'lib/prisma';
import { getManyCategoryWithProd } from 'lib/query';


export default function ProjectPage({}) {
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
  const categories = await getManyCategoryWithProd(8)
  return {
    props: {categories},
    // revalidate: 10,
  };
}