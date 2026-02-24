"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Carousel({ data }) {
  return (
    <section className="p-4 text-center">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="mySwiper"
      >
        {data.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="w-10/12 mx-auto mb-4">
            <p>"{testimonial.content}"</p>
            <p className="font-semibold mt-4">{testimonial.name}</p>
            <span className="mb-4 pb-4">{testimonial.occupation}</span>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}