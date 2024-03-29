import Image, { StaticImageData } from "next/image";
import styles from "../styles/Section.module.scss";

interface SectionProps {
  title: string;
  image?: StaticImageData;
  contrast_bg?: boolean;
  children: React.ReactNode;
}
export default function Section({
  title,
  image,
  contrast_bg,
  children,
}: SectionProps) {
  return (
    <section
      className={`${styles.section} ${contrast_bg ? styles.active : ""}`}
    >
      {title && (
        <h1 className={styles.section__title}>
          {image && (
            <Image
              className={styles.section__icon}
              alt={title}
              src={image}
              height={50}
            />
          )}
          {title}
        </h1>
      )}

      <div className={`${styles.wrapper}`}>
        <section className={`${styles.section__content} container`}>
          {children}
        </section>
      </div>
    </section>
  );
}
