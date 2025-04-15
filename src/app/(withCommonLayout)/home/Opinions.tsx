"use client";

import { Box } from "@mui/material";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { TOpinion } from "@/type";
import MemberCard from "@/components/ui/OpinionCard";

interface OpinionProps {
  opinions: TOpinion[];
}

const Opinions = ({ opinions }: OpinionProps) => {
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
          1180: { slidesPerView: 3 },
        }}
        className="mySwiper"
      >
        {opinions.length > 0 ? (
          opinions?.map((opinion) => (
            <SwiperSlide key={opinion?._id}>
              <MemberCard member={opinion} />
            </SwiperSlide>
          ))
        ) : (
          <Box textAlign="center">No opinions available.</Box>
        )}
      </Swiper>
    </Box>
  );
};

export default Opinions;
