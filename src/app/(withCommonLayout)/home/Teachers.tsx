"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { facultyData } from "@/data/faculties";
import Image from "next/image";
import { Box } from "@mui/material";
import { TTeacher } from "@/type";
import CardTitle from "@/components/ui/CardTitle";
import CardSubTitle from "@/components/ui/CardSubTitle";

const Teachers = () => {
  return (
    <Box>
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
        {facultyData?.map((teacher: TTeacher, index: number) => (
          <SwiperSlide
            key={teacher?._id}
            virtualIndex={index}
            className="w-full mb-10 h-full"
          >
            <Box
              sx={{
                borderRadius: "8px",
                border: "1px solid lightgray",
                width: "100%",
                height: {
                  xl: "400px",
                  lg: "450px",
                  md: "500px",
                  sm: "450px",
                  xs: "400px",
                },
                overflow: "auto",
                backgroundColor: "secondary.main",
                boxShadow: "5 2 1",
                ":hover": {
                  border: "1px solid #22C55E",
                },
                px: "15px",
                py: "15px",
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
                    borderRadius: "10px",

                    mx: "auto",
                    mb: "20px",
                  },
                }}
              >
                <Image
                  src={teacher.image}
                  alt={`teacher ${index + 1}`}
                  width={160}
                  height={160}
                />
              </Box>
              <Box>
                {teacher?.name && <CardTitle title={teacher?.name} />}
                {teacher?.designation && (
                  <CardSubTitle title={teacher?.designation} />
                )}
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Teachers;
