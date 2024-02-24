import style from "styles/AboutUs.module.scss";

export default function AboutUs({}) {
  return (
    <div className={style.about__us}>
      <p>
        <span style={{ color: "red", fontWeight: "bold" }}>
          {" "}
          Công ty TNHH Thiết bị Giao thông Châu Gia Phát
        </span>{" "}
        là một trong những công ty thiết bị giao thông hàng đầu, với đội ngũ kỹ sư
        chuyên nghiệp và giàu kinh nghiệm. Chúng tôi luôn đặt mình vào vị thế
        tiên phong trong việc đón đầu xu hướng công nghệ mới nhất, từ đó đảm bảo
        rằng sản phẩm của chúng tôi luôn đáp ứng được những yêu cầu kỹ thuật cao
        nhất và mang lại hiệu suất tối ưu cho khách hàng.
      </p>
      <p>
        Sự cam kết về chất lượng không ngừng nâng cao cùng với dịch vụ tận tình
        và chu đáo là điểm mạnh giúp Châu Gia Phát xây dựng lòng tin và uy tín
        trong lòng khách hàng. Chúng tôi tự hào là đối tác đáng tin cậy cho mọi
        dự án giao thông.
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
