"use client";

import { Box, Container } from "@mui/material";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "@/assets/banner/Slide -1.jpg";
import banner2 from "@/assets/banner/Slide -2.jpg";
import banner3 from "@/assets/banner/Slide -3.jpg";
import banner4 from "@/assets/banner/Slide -4.jpg";

const slides = [
  { imageUrl: banner1 },
  { imageUrl: banner2 },
  { imageUrl: banner3 },
  { imageUrl: banner4 },
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
            xl: "50px",
            lg: "40px",
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
          className="w-full  object-contain rounded-lg mySwiper"
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
