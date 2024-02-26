
import Breadcrumbs from '@components/Breadcrumbs';
import ProductList from '@components/ProductList';
import Section from '@components/Section';
import PageDescription from '@components/page-description';
import { CategoryWithProducts } from 'lib/prisma';
import { getManyCategoryWithProd } from 'lib/query';

interface ShopProps {
  categories: CategoryWithProducts[];
}

export default function Shop({categories }:ShopProps) {
  // cast category.product as Product

  const description = 'Châu Gia Phát là nhà cung cấp hàng đầu các sản phẩm đèn tín hiệu giao thông, thiết bị điện năng lượng mặt trời và đèn chiếu sáng LED uy tín tại Việt Nam.'
  const keywords = 'Châu Gia Phát, thiết bị an toàn giao thông, đèn chiếu sáng, Thiết bị điện năng lượng mặt trời'
  const links = [
    {url: "/", label: "Trang chủ"},
    {url: "/san-pham", label: "Sản phẩm"}, 
  ]
  return (
    <>
      <PageDescription title='Sản phẩm' description={description} keywords={keywords}/>
      <Breadcrumbs breadcrumbs={links}/>
      <Section title='Sản phẩm'>
        {categories && categories.map((category) => (
            <ProductList key={category.slug} category={category} products={category.products} isCarousel={false}/>
        ))}
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