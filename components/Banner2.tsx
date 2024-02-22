import Image from "next/image";
import styles from 'styles/Banner2.module.scss'
export default function Banner2({ image, alt }) {
  return (
    <div className={styles.banner}>
      <Image
        src={image}
        width={0}
        height={0}
        sizes="100vw"
        style={{
          width: "100%",
          height: "auto",
        }}
        alt={alt}
        priority={false}
      />
      <div
        className={styles.banner__text}
      >
        <h1>Cơ khí Giao thông Châu Gia Phát</h1>
        <p>✨ Đơn vị sản xuất thiết bị an toàn giao thông #1 Việt Nam</p>
        <p>✨ Chuyên cung cấp đèn tín hiệu giao thông, đèn chiếu sáng, biển báo hiệu, ...</p>
      </div>
    </div>
  );
}
