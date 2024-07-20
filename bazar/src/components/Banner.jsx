import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { useRef } from "react";

const Banner = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // arrows: true,
    // centerMode: true,
  };

  const images = [
    "https://amazonproone.vercel.app/static/media/img2.bc1bdb910ead16c65197.jpg",
    "https://amazonproone.vercel.app/static/media/img5.aa945e25375bfdee385f.jpg",
    "https://amazonproone.vercel.app/static/media/img3.c80809bb40bee5c34372.jpg",
    "https://amazonproone.vercel.app/static/media/img1.efb3d39101f7ef77d616.jpg",
  ];

  const sliderRef = useRef(null);
  // console.log(sliderRef);

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="relative w-screen">
        <Slider {...settings} ref={sliderRef}>
          {images.map((image, index) => (
            <img
              key={index}
              className="object-cover w-screen h-full"
              alt={`banner${index}`}
              loading="priority"
              src={image}
            />
          ))}
        </Slider>
        <div className="absolute left-0 right-0 flex gap-8 mx-auto w-fit bottom-44">
          <div
            className="arrowStyle"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <HiArrowLeft />
          </div>
          <div
            className="arrowStyle"
            onClick={() => sliderRef.current.slickNext()}
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
