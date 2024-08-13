"use client";

import { Box } from "@mui/material";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { opinionData } from "@/data/opinion";
import Image from "next/image";
import { TOpinion } from "@/type";
import CardTitle from "@/components/ui/CardTitle";
import CardSubTitle from "@/components/ui/CardSubTitle";
import Details from "@/components/ui/Details";

const Opinions = () => {
  return (
    <Swiper
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
      {opinionData.map((opinion: TOpinion, index: number) => (
        <SwiperSlide
          key={opinion?._id}
          virtualIndex={index}
          className="w-full mb-10 h-full"
        >
          <Box
            sx={{
              borderRadius: "8px",
              border: "1px solid lightgray",
              width: "100%",
              height: {
                xl: "680px",
                lg: "740px",
                md: "700px",
                sm: "100%",
                xs: "100%",
              },

              backgroundColor: "secondary.main",
              boxShadow: "5 2 1",
              ":hover": {
                border: "1px solid #22C55E",
              },
              p: "20px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                "& img": {
                  width: "200px",
                  height: "200px",
                  overflow: "hidden",
                  objectFit: "contain",
                  borderRadius: "100px",
                  mx: "auto",
                  mb: "20px",
                },
              }}
            >
              <Image
                src={opinion.image}
                alt={`Opinion ${index + 1}`}
                width={300}
                height={300}
              />
            </Box>
            <Box sx={{ overflow: "hidden" }}>
              {opinion?.name && <CardTitle title={opinion?.name} />}
              {opinion?.designation && (
                <CardSubTitle title={opinion?.designation} />
              )}
              {opinion?.opinion && <Details details={opinion?.opinion} />}
            </Box>
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Opinions;
