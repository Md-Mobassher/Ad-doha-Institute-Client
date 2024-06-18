"use client";

import { booksData } from "@/data/books";
import DohaButton from "../DohaButton";
import Container from "../Container";
import Title from "../Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { TBook } from "@/type";
import Image from "next/image";
import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import DohaBook from "../DohaBook";

const BooksSection = () => {
  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Title title="বই" />
        <DohaButton btnTitle="সকল" navigate="resourses/books" />
      </Stack>

      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        autoplay={{
          delay: 4000,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        draggable={true}
        breakpoints={{
          300: {
            slidesPerView: 2,
          },
          600: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1200: {
            slidesPerView: 5,
          },
          1800: {
            slidesPerView: 6,
          },
        }}
        className=""
      >
        {booksData.map((book: TBook) => (
          <SwiperSlide className=" mb-12 h-full " key={book.id}>
            <DohaBook {...book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default BooksSection;
