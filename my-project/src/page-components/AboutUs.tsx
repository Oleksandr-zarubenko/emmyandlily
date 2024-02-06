import { Markdown } from "@/components/Markdown";
import { Paw2 } from "@/components/icons/Paw2";
import Image from "next/image";

export const AboutUs = ({ data }: { data: any }) => {
  return (
    <section className="py-12 xl:py-24" id="who-we-are">
      <div className="container flex flex-col gap-10 md:flex-row md:gap-20">
        <div className="flex flex-col xl:order-1">
          <Markdown
            text={data.aboutUsSection.heading}
            className="mb-5 md:mb-10"
          />
          <Markdown text={data.aboutUsSection.text} />
        </div>
        <div className="xl:order-0 relative mx-auto h-[253px] w-[304px]">
          <div className="relative h-[253px] w-[304px] flex-shrink-0 overflow-hidden rounded-3xl border-2 border-primary md:h-[300px] md:w-[300px] xl:h-[453px] xl:w-[430px]">
            <Image
              src={data.aboutUsSection.image.url}
              alt={data.aboutUsSection.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
          <Paw2 className="paw2 absolute h-64 w-64" />
        </div>
      </div>
    </section>
  );
};
