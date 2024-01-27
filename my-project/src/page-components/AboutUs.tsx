import { Markdown } from "@/components/Markdown";
import { Paw2 } from "@/components/icons/Paw2";
import Image from "next/image";

export const AboutUs = ({ data }: { data: any }) => {
  return (
    <section className="py-24">
      <div className="container flex flex-row gap-20">
        <div className="order-1 flex flex-col">
          <Markdown text={data.aboutUsSection.heading} />
          <Markdown text={data.aboutUsSection.text} />
        </div>
        <div className="order-0 relative">
          <div className="order-0 relative h-[453px] w-[430px] flex-shrink-0 overflow-hidden rounded-3xl border-2 border-primary">
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
