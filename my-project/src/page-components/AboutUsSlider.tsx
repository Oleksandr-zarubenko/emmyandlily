import { Markdown } from "@/components/Markdown";
import { Slider } from "@/components/Slider";
import { Paw } from "@/components/icons/Paw3";
import Image from "next/image";
import Dog1 from "../../public/About us.jpg";
import Dog2 from "../../public/About us2.png";
import Dog3 from "../../public/About us3.jpg";
export const AboutUsSlider = ({ data }: { data: any }) => {
  return (
    <section
      className="flex h-[724px] justify-center bg-black py-8 xl:py-16 xl:text-center"
      id="about-us"
    >
      <ul className="container flex text-left text-white">
        <li className="mr-6 w-1/3">
          <div className="h-1/2">
            <h1 className="mb-1 text-t32">{data.aboutUsSlider.Heading}</h1>

            <div className="mb-2 flex text-center text-t32">
              <Paw className="mr-4 p-[4px] text-white" />{" "}
              <h2>{data.aboutUsSlider.name}</h2>
            </div>
            <div className="text-t16 leading-5 opacity-80 ">
              {" "}
              <p className="mb-2">{data.aboutUsSlider.text} </p>
              <p>{data.aboutUsSlider.text2}</p>
            </div>
          </div>
          <Image alt="dog" width={357} height={311} src={Dog1} />
        </li>
        <li className="mr-6 w-1/3 ">
          <Image alt="dog" width={357} height={311} src={Dog2} />
          <div className="mt-6 h-1/2">
            <h2 className="mb-2  text-t24">{data.aboutUsSlider.name2}</h2>
            <div className="text-t16 leading-5 opacity-80">
              {" "}
              <p className="mb-2">{data.aboutUsSlider.text3}</p>
              <p>{data.aboutUsSlider.text4}</p>
            </div>
          </div>
        </li>
        <li className="w-1/3">
          <div className="h-1/2">
            <h2 className="mb-2  text-t24">{data.aboutUsSlider.name3}</h2>
            <div className="text-t16 leading-5 opacity-80">
              {" "}
              <p className="mb-2">{data.aboutUsSlider.text5}</p>
              <p> {data.aboutUsSlider.text6}</p>
            </div>
          </div>
          <Image alt="dog" width={357} height={311} src={Dog3} />{" "}
        </li>
      </ul>
    </section>
  );
};

{
  /* <div className="container">
  <div className="mb-4 flex flex-row items-center gap-4 xl:mb-10 xl:justify-center">
    <Paw className="h-8 w-8 text-primary md:h-11 md:w-11" />
    <Markdown text={data.aboutUsSlider.heading} className="mb-0" />
  </div>
  <Markdown text={data.aboutUsSlider.text} />
  <div className="mt-10 xl:w-[1800px] xl:translate-x-[-400px]">
    <Slider sliderimages={data.aboutUsSlider.sliderimages} />
  </div>
</div> */
}
