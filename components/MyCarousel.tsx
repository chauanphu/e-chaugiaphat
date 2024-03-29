
import styles from '../styles/Carousel.module.scss';


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const default_responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1025 },
    items: 4,
    partialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    partialVisibilityGutter: 30
  },
  tablet: {
    breakpoint: { max: 1024, min: 577 },
    items: 2,
    partialVisibilityGutter: 30
  }
}

const MyCarousel = ({ children, seconds=3, responsive=default_responsive, withDot=false }) => {
  return (
    <Carousel
    className={styles.carousel}
      additionalTransfrom={0}
      arrows={!withDot}
      autoPlay={true}
      autoPlaySpeed={seconds*1000}
      centerMode={false}
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      infinite
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={responsive}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      showDots={withDot}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {children}
    </Carousel>
  );
};

export default MyCarousel;
