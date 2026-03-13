"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";

import "swiper/css";
import "swiper/css/pagination";

import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { DatoImageWithId } from "@/types/dato";

export const Slider = ({ sliderimages }: { sliderimages: DatoImageWithId[] }) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={0}
      initialSlide={2}
      watchOverflow
      centeredSlides
      autoplay={{ delay: 1000 }}
      speed={2000}
      loop
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 1,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 3,
          centeredSlides: true,
        },
      }}
      className="h-[225px] md:h-[400px]"
    >
      {sliderimages &&
        sliderimages.map((sliderimage, index: number) => (
          <SwiperSlide key={`${index}-${sliderimage.id}`} className="">
            {({ isActive }) => (
              <div
                className={cn(
                  isActive ? "" : "origin-bottom scale-90 duration-500",
                  "relative h-[190px] overflow-hidden rounded-3xl border-2	border-primary md:h-[360px] xl:w-[600px]"
                )}
              >
                <Image
                  src={sliderimage.url}
                  alt={sliderimage.alt || "Emmy and Lily"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
              </div>
            )}
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
