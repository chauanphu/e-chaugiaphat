import style from "styles/AboutUs.module.scss";

export default function AboutUs({}) {
  return (
    <div className={style.about__us}>
      <p>
        Với đội ngũ kỹ sư có trình độ cao, luôn đón đầu công nghệ mới, chúng tôi
        là nhà cung cấp giải pháp và tích hợp hệ thống chuyên nghiệp đáng tin
        cậy của các bạn.
      </p>
      <p>
        Với khả năng và kinh nghiệm của đội ngũ kỹ sư, chính sách hậu mãi tốt và
        sự chăm sóc khách hàng thường xuyên, chúng tôi đã tạo uy tín tốt đối với
        khách hàng. Đây chính là yếu tố tạo tốc độ tăng trưởng cao của
        <span style={{ color: "red", fontWeight: "bold" }}>
          {" "}
          Công ty TNHH CƠ KHÍ GIAO THÔNG CHÂU GIA PHÁT
        </span>{" "}
        trong thời gian qua.
      </p>
      <div className={style.features}>
        <div className={style.item}>
          <h3>Chất lượng</h3>
          <p>
            Chất lượng sản phẩm và dịch vụ là tiêu chí hàng đầu của chúng tôi.
          </p>
        </div>
        <div className={style.item}>
          <h3>Giá cả</h3>
          <p>
            Chúng tôi cam kết cung cấp sản phẩm và dịch vụ với giá cả hợp lý
            nhất.
          </p>
        </div>
        <div className={style.item}>
          <h3>Chăm sóc khách hàng</h3>
          <p>
            Chúng tôi luôn lắng nghe và hỗ trợ khách hàng trong mọi tình huống.
          </p>
        </div>
        <div className={style.item}>
          <h3>Đội ngũ</h3>
          <p>Đội ngũ kỹ sư có trình độ cao, luôn đón đầu công nghệ mới.</p>
        </div>
      </div>
    </div>
  );
}
