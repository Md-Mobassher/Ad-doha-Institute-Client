"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Box } from "@mui/material";
import { TTeacher } from "@/type";
import FacultyCard from "@/components/ui/FacultyCard";

interface TeachersProps {
  teachers: TTeacher[];
}

const Teachers = ({ teachers }: TeachersProps) => {
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
        {teachers.length > 0 ? (
          teachers.map((teacher, index) => (
            <SwiperSlide key={teacher?._id}>
              <FacultyCard member={teacher} />
            </SwiperSlide>
          ))
        ) : (
          <Box textAlign="center">No Teacher available.</Box>
        )}
      </Swiper>
    </Box>
  );
};

export default Teachers;
