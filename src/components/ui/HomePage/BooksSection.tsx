"use client";

import { booksData } from "@/data/books";
import Button from "../Button";
import Container from "../Container";
import Title from "../Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { TBook } from "@/type";
import Image from "next/image";
import Link from "next/link";

const BooksSection = () => {
  return (
    <Container>
      <div className="flex justify-between items-center lg:px-3 mb-7">
        <Title title="বই" />
        <Button btnTitle="সকল" navigate="resourses/books" />
      </div>

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
            <div key={book.id}>
              <Link href={book.link} target="_blank">
                <div className="border hover:border-primary rounded-lg shadow-md hover:shadow-2xl p-2 w-full h-full flex flex-col justify-between transition-all duration-500">
                  <div>
                    <Image
                      src={book.image}
                      alt={book.title}
                      width={180}
                      height={220}
                      className="mx-auto pb-2"
                    />
                  </div>
                  <div>
                    <hr />
                    <p className="text-center my-2 text-primary font-bold">
                      {book.title}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default BooksSection;
