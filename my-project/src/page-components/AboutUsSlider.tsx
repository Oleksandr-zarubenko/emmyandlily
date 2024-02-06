import { Markdown } from "@/components/Markdown";
import { Slider } from "@/components/Slider";
import { Paw } from "@/components/icons/Paw";

export const AboutUsSlider = ({ data }: { data: any }) => {
  return (
    <section className="py-8 xl:py-16 xl:text-center" id="about-us">
      <div className="container">
        <div className="mb-4 flex flex-row items-center gap-4 xl:mb-10 xl:justify-center">
          <Paw className="h-8 w-8 text-primary md:h-11 md:w-11" />
          <Markdown text={data.aboutUsSlider.heading} className="mb-0" />
        </div>
        <Markdown text={data.aboutUsSlider.text} />
        <div className="mt-10 xl:w-[1800px] xl:translate-x-[-400px]">
          <Slider sliderimages={data.aboutUsSlider.sliderimages} />
        </div>
      </div>
    </section>
  );
};
