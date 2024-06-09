import { Markdown } from "@/components/Markdown";
import Image from "next/image";
import HeroDog from "../../public/hero-dog.webp";
import { AddToCartHeroBtn } from "@/components/AddToCartHeroBtn";

export const HeroSection = ({ data }: { data: any }) => {
  return (
    <div className="hero relative bg-white text-center">
      <div className="container relative text-grey ">
        <Image
          src={HeroDog}
          alt={"Emmy Dog"}
          className="absolute -bottom-16 -left-28 z-20 h-[360px] w-[298px] object-contain md:-bottom-20 md:-left-0 md:h-[420px] md:w-[338px] xl:-bottom-[110px] xl:left-0 xl:h-[584px] xl:w-[476px]"
          sizes="50vw"
        />
        <Markdown
          text={data.mainSection.heading}
          className="mb-10 mt-28 md:mx-auto md:max-w-[400px] xl:mb-20 xl:mr-[280px] xl:mt-36 xl:max-w-[655px]"
        />
        <p className="mb-4 font-sans  text-t24n font-bold leading-7 tracking-[0.16px] xl:mr-[180px] xl:text-t32n">
          {data.mainSection.bigtext}
        </p>
        <AddToCartHeroBtn
          lang={data.lang}
          data={data}
          secondtext={data.mainSection.inCart}
          text={data.mainSection.btn}
          className="mb-[260px] xl:mr-[180px]"
        />
      </div>
    </div>
  );
};
