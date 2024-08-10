"use client";

import assets from "@/assets";
import { Box, Container } from "@mui/material";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  { imageUrl: assets?.banner?.slide1 },
  { imageUrl: assets?.banner?.slide2 },
  { imageUrl: assets?.banner?.slide3 },
  { imageUrl: assets?.banner?.slide4 },
];

const BannerSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "info.main",
      }}
    >
      <Container
        sx={{
          py: {
            xl: "60px",
            lg: "50px",
            md: "30px",
            sm: "20px",
            xs: "10px",
          },
          px: {
            xl: "10px",
            lg: "60px",
            md: "50px",
            sm: "12px",
            xs: "10px",
          },
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 2500,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="w-full lg:h-[560px] md:h-[400px] h-[200px] object-cover rounded-lg mySwiper"
        >
          {slides.map((slide, index: number) => (
            <SwiperSlide
              key={index}
              virtualIndex={index}
              className="w-full mb-10"
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
      </Container>
    </Box>
  );
};

export default BannerSection;
