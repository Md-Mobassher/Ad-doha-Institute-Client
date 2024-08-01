"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import DohaCard from "./DohaCard";
import { TCardProps, TSliderProps } from "@/type";

const Slider = ({
  items,
  spaceBetween,
  slidesPerView,
  btnTitle,
  btnTitle2,
  navigate,
}: TSliderProps) => {
  return (
    <Swiper
      spaceBetween={spaceBetween || 25}
      slidesPerView={slidesPerView || 3}
      autoplay={{
        delay: 4000,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      draggable={true}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        1000: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 3,
        },
        1800: {
          slidesPerView: 3,
        },
      }}
      className=""
    >
      {items.map((item: TCardProps) => (
        <SwiperSlide className=" mb-12 h-full " key={item.id}>
          <DohaCard
            {...item}
            btnTitle={btnTitle}
            navigate={navigate}
            btnTitle2={btnTitle2}
            link={item.link}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
