import { Markdown } from "@/components/Markdown";
import Image from "next/image";
import HeroDog from "../../public/hero-dog.png";
import { AddToCartHeroBtn } from "@/components/AddToCartHeroBtn";

export const HeroSection = ({ data }: { data: any }) => {
  return (
    <div className="hero relative bg-white text-center xl:text-left">
      <div className="container relative xl:min-h-[680px]">
        <Image
          src={HeroDog}
          alt={"Emmy Dog"}
          className="absolute -bottom-24 left-0 z-20 h-[584px] w-[476px] object-contain"
        />
        <div className="order-1 mb-8 w-[655px] text-center text-bg_secondary xl:justify-start">
          <p className="text-t50 relative left-20 top-[152px] w-[655px]  md:text-t48 ">
            {data.mainSection.bigtext}
          </p>
        </div>
        <div className="relative left-[210px] top-[252px] w-[388px] text-center ">
          <Markdown
            text={data.mainSection.heading}
            className="order-3 mb-4 h-10 !text-t16 !text-bg_secondary md:!text-t24n xl:!text-t32"
          />
          <AddToCartHeroBtn text={data.mainSection.btn} />
        </div>
      </div>
    </div>
  );
};
