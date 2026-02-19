"use client"
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Carousel({data}) {
    return(
        <section className="p-4 text-center">
            <Swiper
            navigation={true}
            modules={[Navigation]}
            loop={true}
            id="mySwiper"
                >
                {data.map((testimonial) => (
                    <SwiperSlide key={testimonial.id} className="w-10/12 mx-auto mb-4">
                        <p>"{testimonial.content}"</p>
                        <p className="font-semibold mt-4">{testimonial.name}</p>
                        <span>{testimonial.occupation}</span>
                    </SwiperSlide>
                ))}
            </Swiper>
        
        </section>
    )
}