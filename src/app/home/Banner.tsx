"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Banner = ({ slides }: any) => {
  return (
    <div className="mt-3 mb-5 px-4 min-h-screen">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        coverflowEffect={{
          rotate: 80,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        spaceBetween={0}
        autoplay={{
          delay: 2500,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, EffectCoverflow]}
        className="w-full h-full rounded-lg mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide} virtualIndex={index} className="w-full">
            <Image
              src={slide.imageUrl}
              alt={`Slide ${index + 1}`}
              className="rounded-md w-full"
              width={800}
              height={800}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
