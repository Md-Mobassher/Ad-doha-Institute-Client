"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import LoadingPage from "@/app/loading";
import { useGetAllVideosQuery } from "@/redux/features/admin/videoManagementApi";
import { TVideo } from "@/type";
import { Box } from "@mui/material";

const Videos = () => {
  const { data, isLoading } = useGetAllVideosQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }

  const videosData = data?.videos;

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        loop={true}
        pagination={{
          clickable: true,
        }}
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
        {/* <Box className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 "> */}
        {videosData?.map((video: TVideo) => (
          <SwiperSlide key={video.id}>
            <Box className="flex justify-center border" key={video.id}>
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
        {/* </Box> */}
      </Swiper>
    </>
  );
};

export default Videos;
