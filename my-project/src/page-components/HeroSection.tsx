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
        <Image
          src={data?.mainSection.bottles?.url}
          alt={data?.mainSection.bottles?.alt || ""}
          className="2xl:left-[60vw] custom-position absolute bottom-0 left-[20vw] z-10 h-64 w-96 object-contain object-left-bottom md:left-[50vw] xl:h-96"
          sizes="50vw"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};
