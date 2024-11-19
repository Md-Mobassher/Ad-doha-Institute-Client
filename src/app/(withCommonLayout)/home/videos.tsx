"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { IVideo } from "@/type";
import { Box } from "@mui/material";
import { useRef } from "react";

interface VideosProps {
  videos: IVideo[];
}

const Videos = ({ videos }: VideosProps) => {
  const swiperRef = useRef<any>(null);

  const handleVideoPlay = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleVideoPause = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        spaceBetween={25}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
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
        {videos &&
          videos?.map((video: IVideo) => (
            <SwiperSlide key={video?._id}>
              <Box
                className="flex justify-center border"
                onMouseEnter={handleVideoPlay}
                onMouseLeave={handleVideoPause}
                key={video._id}
              >
                <iframe
                  width="620"
                  height="300"
                  src={video.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPause}
                ></iframe>
              </Box>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

export default Videos;
