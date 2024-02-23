import React from "react";
import styles from "../styles/ProductCard.module.scss";
import Link from "next/link";
import StarRatings from "react-rating-stars-component";

import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const link = `/san-pham/${product.categorySlug}/${product.slug}`;
  return (
    <>
      {product && (
        <Link key={product.slug} href={link}>
          <div className={styles.ProductCard}>
            <Image
              className={styles.ProductCard__image}
              itemProp="image"
              src={product.image ? "/api/images/san-pham/" + product.image : ""}
              alt={product.name}
              width={150}
              height={150}
            />
            <h2 className={styles.ProductCard__title} itemProp="name">
              {product.name}
            </h2>
            <p className={styles.ProductCard__price}>
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
            </span>
          </div>
        </Link>
      )}
    </>
  );
};

export default ProductCard;
