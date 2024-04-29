"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Card from "./Card";
import { TCardProps, TSliderProps } from "@/type";

const Slider = ({ items, spaceBetween, slidesPerView }: TSliderProps) => {
  return (
    <Swiper
      spaceBetween={spaceBetween || 30}
      slidesPerView={slidesPerView || 3}
      autoplay={{
        delay: 3000,
      }}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
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
          slidesPerView: 4,
        },
        1800: {
          slidesPerView: 5,
        },
      }}
      className="w-full h-full "
    >
      {items.map((item: TCardProps) => (
        <SwiperSlide className="flex visible h-full mb-12" key={item.id}>
          <Card {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
