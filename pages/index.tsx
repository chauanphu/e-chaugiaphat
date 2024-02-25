import PageDescription from "../components/page-description";
import Section from "../components/Section";
import ProductList from "@components/ProductList";
import Banner2 from "@components/Banner2";
import ProjectList from "@components/ProjectList";
import AboutUs from "@components/AboutUs";

// import { Product, Category } from '@prisma/client';
import { CategoryWithProducts } from "../lib/prisma";
import about_us_icon from "../public/images/about-us-icon.gif";
import cart_icon from "../public/images/cart-icon.gif";
import { getManyCategoryWithProd, getManyProjects } from "lib/query";
import { Project } from "@prisma/client";
import GoogleMap from "@components/GoogleMap";

interface HomeProps {
  categories: CategoryWithProducts[];
  projects: Project[];
}
export default function Home({ categories, projects }: HomeProps) {
  return (
    <>
      <PageDescription
        title="Trang chủ"
        keywords="Châu Gia Phát, Trang chủ, đèn giao thông, an toàn giao thông"
      />
      <Banner2 image={"/api/images/banner/banner-main.webp"} alt="Banner" />
      <Section title={"Về Cơ khí Giao thông Châu Gia Phát"} contrast_bg={true}>
        <AboutUs />
      </Section>
      <Section title={"Sản phẩm"} image={cart_icon}>
        {categories &&
          categories.map((category) => (
            <ProductList
              key={category.slug}
              category={category}
              products={category.products}
            />
          ))}
        {/* <ProductCard category={category} products={}/> */}
      </Section>
      <Section
        title={"Dự án đã thực hiện"}
        image={about_us_icon}
        contrast_bg={true}
      >
        <ProjectList projects={projects} isCarousel={true}></ProjectList>
      </Section>
      <GoogleMap />
    </>
  );
}

// Config as server side rendering
export async function getServerSideProps() {
  // Query all categories with their top 8 products
  const categories = await getManyCategoryWithProd(8);
  const projects = await getManyProjects();
  return {
    props: { categories, projects },
    // revalidate: 10,
  };
}
