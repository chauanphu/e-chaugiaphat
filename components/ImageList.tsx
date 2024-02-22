import React from "react";
import MyCarousel from "./MyCarousel";
import Image from "next/image";
import styles from "styles/ProductCard.module.scss";
import Link from "next/link";

export interface ImageListProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30
    }
  }

export default function ImageList({ images }: ImageListProps) {
  return images && images.length > 0 ? (
    <MyCarousel seconds={3} responsive={responsive}>
      {images.map((image) => (
        <Link key={image.src} href={image.src}>
          <div className={styles.ProductCard}>
            <Image
              className={styles.ProductCard__image}
              src={image.src ? image.src : ""}
              alt={image.alt}
              height={150}
              width={150}
              sizes="100vw"
            />
            <h2 className={styles.ProductCard__title} itemProp="name">
              {"Du an"}
            </h2>
            {/* <p className={styles.ProductCard__price}>
              {product.price.toLocaleString("en-US")} đ
            </p>
            <span className={styles.ProductCard__rating}>
              <StarRatings
                value={product.rating ? product.rating : 4.5}
                numberOfStars={5}
                name="rating"
                editing={false}
              />
              ({product.rating ? product.rating : 4.5})
            </span> */}
          </div>
        </Link>
      ))}
    </MyCarousel>
  ) : (
    <p>Đang cập nhật</p>
  );
}
