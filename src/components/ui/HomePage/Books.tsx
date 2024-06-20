"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { TBook } from "@/type";
import DohaBook from "../DohaBook";
import LoadingPage from "@/app/loading";
import { useGetAllBooksQuery } from "@/redux/features/admin/bookManagementApi";

const Books = () => {
  const { data, isLoading } = useGetAllBooksQuery({});

  if (isLoading) {
    return <LoadingPage />;
  }

  const booksData = data?.books;

  return (
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
          slidesPerView: 4,
        },
        1800: {
          slidesPerView: 5,
        },
      }}
      className=""
    >
      {booksData?.map((book: TBook) => (
        <SwiperSlide className=" mb-12 h-full " key={book.id}>
          <DohaBook {...book} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Books;
