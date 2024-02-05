import { Markdown } from "@/components/Markdown";
import { Paw } from "@/components/icons/Paw";

export const HeroSection = ({ data }: { data: any }) => {
  return (
    <div className="relative bg-bg_primary text-center xl:text-left">
      <div className="hero container flex items-center xl:h-[800px]">
        <div className="mx-auto mb-96 mt-32 flex flex-col md:mb-[642px] md:max-w-[416px] xl:mb-0 xl:ml-5 xl:mt-0 xl:max-w-96 smOnly:p-2">
          <Markdown text={data.mainSection.heading} className="order-2" />
          <div className="order-1 mb-8 flex flex-row justify-center gap-1 text-dark xl:justify-start">
            <Paw className="h-12 w-12 flex-shrink-0 md:h-20 md:w-20" />
            <p className="text-t50 md:text-t80">{data.mainSection.bigtext}</p>
          </div>
          <Markdown
            text={data.mainSection.text}
            className="md:text-t24n order-3 text-t16"
          />
        </div>
      </div>
    </div>
  );
};
