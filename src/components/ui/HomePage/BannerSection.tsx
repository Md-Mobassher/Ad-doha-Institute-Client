"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DohaContainer from "../DohaContainer";

type TSlide = {
  imageUrl: string;
};

const BannerSection = ({ slides }: any) => {
  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
      <DohaContainer>
        <Swiper
          slidesPerView={1}
          coverflowEffect={{
            rotate: 60,
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
          modules={[Autoplay, Pagination]}
          className="w-full lg:h-[560px] md:h-[400px] h-[350px] object-cover rounded-lg mySwiper"
        >
          {slides.map((slide: TSlide, index: number) => (
            <SwiperSlide
              key={index}
              virtualIndex={index}
              className="w-full mb-12"
            >
              <Image
                src={slide.imageUrl}
                alt={`Slide ${index + 1}`}
                className="rounded-md w-full"
                width={1200}
                height={560}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </DohaContainer>
    </Box>
  );
};

export default BannerSection;
