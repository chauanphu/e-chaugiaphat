import style from "styles/GoogleMap.module.scss";
export default function GoogleMap() {
  return (
    <div className={style.map}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.8474694296783!2d106.60574725226154!3d10.844176607056859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752a4a74b55809%3A0xa1c2b8a88cdedec7!2sC%C3%94NG%20TY%20TNHH%20SX%20TM%20DV%20CH%C3%82U%20GIA%20PH%C3%81T!5e0!3m2!1sen!2s!4v1708819280411!5m2!1sen!2s"
        width="800"
        height="300"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
