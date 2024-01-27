"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export const Slider = ({ sliderimages }: { sliderimages: any }) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={3}
      initialSlide={2}
      watchOverflow
      centeredSlides
      loop
      pagination={{
        clickable: true,
      }}
      onSwiper={(swiper) => console.log(swiper)}
      className="h-[400px]"
    >
      {sliderimages &&
        sliderimages.map((sliderimage: any, index: number) => (
          <SwiperSlide key={index + sliderimage.alt} className="">
            {({ isActive }) => (
              <div
                className={cn(
                  isActive ? "" : "origin-bottom scale-90 duration-500",
                  "relative h-[360px] w-[600px] overflow-hidden	rounded-3xl border-2 border-primary"
                )}
              >
                <Image
                  src={sliderimage.url}
                  alt={sliderimage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
