"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { facultyData } from "@/data/faculties";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { TTeacher } from "@/type";

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
                  lg: "500px",
                  md: "520px",
                  sm: "500px",
                  xs: "500px",
                },
                overflow: "auto",
                backgroundColor: "#F7F3E7",
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
                    width: "100%",
                    height: "260px",
                    overflow: "hidden",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border: "1px solid lightgray",
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
                {teacher?.name && (
                  <Typography
                    component="h3"
                    variant="h3"
                    fontSize={{
                      lg: "22px",
                      md: "20px",
                      sm: "19px",
                      xs: "18px",
                    }}
                    mb="12px"
                    fontWeight="600"
                    color="primary.main"
                    textAlign="center"
                  >
                    {teacher?.name}
                  </Typography>
                )}
                {teacher?.designation && (
                  <Typography
                    component="p"
                    fontSize={{
                      lg: "15px",
                      md: "15px",
                      sm: "14px",
                      xs: "14px",
                    }}
                    mb="16px"
                    fontWeight="400"
                    textAlign="center"
                    color="warning.main"
                  >
                    {teacher?.designation}
                  </Typography>
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
