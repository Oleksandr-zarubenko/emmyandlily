import { Markdown } from "@/components/Markdown";
import { Paw } from "@/components/icons/Paw";

export const HeroSection = ({ data }: { data: any }) => {
  return (
    <div className="relative bg-bg_primary text-center xl:text-left">
      <div className="hero container flex items-center xl:h-[800px]">
        <div className="mx-auto mb-96 mt-32 flex flex-col md:mb-[642px] md:max-w-[416px] xl:mb-0 xl:ml-0 xl:mt-0 xl:max-w-96 smOnly:p-2">
          <Markdown text={data.mainSection.heading} className="order-2" />
          <div className="order-1 mb-8 flex flex-row justify-center gap-1 text-bg_secondary xl:justify-start">
            <Paw className="h-12 w-12 flex-shrink-0 md:h-16 md:w-16" />
            <p className="text-t50  md:text-t80">{data.mainSection.bigtext}</p>
          </div>
          <Markdown
            text={data.mainSection.text}
            className="order-3 !text-t16 !text-bg_secondary md:!text-t24n"
          />
        </div>
      </div>
    </div>
  );
};
