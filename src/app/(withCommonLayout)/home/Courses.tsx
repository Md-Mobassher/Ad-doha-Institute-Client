"use client";

import { Box, Card, Stack } from "@mui/material";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TCourse } from "@/type";
import Image from "next/image";
import CoursePrice from "../courses/components/CoursePrice";
import Link from "next/link";
import DohaButton from "@/components/ui/DohaButton";
import { useTranslations } from "next-intl";

interface CoursesProps {
  courses: TCourse[];
}

const Courses = ({ courses }: CoursesProps) => {
  const t = useTranslations("HomePage");

  return (
    <Box>
      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        autoplay={{ delay: 5000 }}
        loop
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          300: { slidesPerView: 1 },
          600: { slidesPerView: 2 },
          980: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {courses.length > 0 ? (
          courses?.map((course) => (
            <SwiperSlide key={course?._id}>
              <Card
                key={course?._id}
                sx={{
                  border: "1px solid lightgray",
                  borderRadius: "8px",
                  ":hover": {
                    border: "1px solid #0F473C",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: {
                      lg: "300px",
                      md: "280px",
                      sm: "auto",
                      xs: "auto",
                    },
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={course?.courseImage}
                    alt="course image"
                    width={600}
                    height={400}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    className="border-b border-gray-300"
                  />
                </Box>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  px={2}
                  py={2}
                >
                  <CoursePrice price={course?.fee?.total} />

                  <Link href={`/courses/${course?._id}`}>
                    <DohaButton btnTitle={t("popularCourseSec.btnTitle")} />
                  </Link>
                </Stack>
              </Card>
            </SwiperSlide>
          ))
        ) : (
          <Box textAlign="center">No Course available.</Box>
        )}
      </Swiper>
    </Box>
  );
};

export default Courses;
