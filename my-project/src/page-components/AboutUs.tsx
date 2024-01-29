import { Markdown } from "@/components/Markdown";
import { Paw2 } from "@/components/icons/Paw2";
import Image from "next/image";

export const AboutUs = ({ data }: { data: any }) => {
  return (
    <section className="py-12 xl:py-24">
      <div className="container flex flex-col gap-10 xl:flex-row xl:gap-20">
        <div className="order-1 flex flex-col">
          <Markdown
            text={data.aboutUsSection.heading}
            className="mb-5 xl:mb-10"
          />
          <Markdown text={data.aboutUsSection.text} />
        </div>
        <div className="order-0 relative smOnly:mx-auto smOnly:w-5/6">
          <div className="relative h-60 w-full flex-shrink-0 overflow-hidden rounded-3xl border-2 border-primary xl:h-[453px] xl:w-[430px]">
            <Image
              src={data.aboutUsSection.image.url}
              alt={data.aboutUsSection.image.alt}
              fill
              className="object-cover"
            />
          </div>
          <Paw2 className="paw2 h-44 w-44" />
        </div>
      </div>
    </section>
  );
};
