"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { IVideo } from "@/type";
import { Box } from "@mui/material";

interface VideosProps {
  videos: IVideo[];
}

const Videos = ({ videos }: VideosProps) => {
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={25}
      loop={true}
      pagination={{
        clickable: true,
      }}
      draggable={true}
      modules={[Pagination]}
      breakpoints={{
        300: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        1180: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 3,
        },
        1800: {
          slidesPerView: 3,
        },
      }}
      className="w-full h-full flex justify-between items-stretch mySwiper"
    >
      {videos.map((video: IVideo) => (
        <SwiperSlide key={video._id}>
          <Box className="flex justify-center border">
            <iframe
              width="620"
              height="300"
              src={video.url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Videos;
