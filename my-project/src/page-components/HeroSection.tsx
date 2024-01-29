import { Markdown } from "@/components/Markdown";
import { Paw } from "@/components/icons/Paw";

export const HeroSection = ({ data }: { data: any }) => {
  return (
    <div className="hero relative bg-bg_primary">
      <div className="container flex h-[400px] items-center xl:h-[800px]">
        <div className="flex max-w-96 flex-col xl:ml-5 smOnly:rounded-xl smOnly:bg-bg_secondary/80 smOnly:p-2">
          <Markdown text={data.mainSection.heading} className="order-2" />
          <div className="order-1 mb-8 flex flex-row gap-1 text-dark">
            <Paw className="h-16 w-16 flex-shrink-0" />
            <p className="text-t70">{data.mainSection.bigtext}</p>
          </div>
          <Markdown text={data.mainSection.text} className="order-3" />
        </div>
      </div>
    </div>
  );
};
