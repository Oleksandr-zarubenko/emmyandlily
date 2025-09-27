import { Markdown } from "@/components/Markdown";
import Image from "next/image";

export const AboutUs = ({ data }: { data: any }) => {
  return (
    <section
      className="bg-black py-7 text-white md:py-11 xl:py-14"
      id="about-us"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          <div className="mdOnly:order-1">
            <div className="flex flex-row">
              <Markdown text={data.aboutUsSection.heading} paw />
            </div>
            <Markdown text={data.aboutUsSection.text1} />
          </div>
          <div className="relative aspect-[1.35] w-full object-center xl:aspect-square mdOnly:order-3">
            <Image
              src={data.aboutUsSection.image1.url}
              alt={data.aboutUsSection.image1.alt || "image"}
              fill
              sizes="(max-width: 768px) 90vw, 312px"
              className="h-auto  object-cover"
            />
          </div>
          <div className="mdOnly:order-4">
            <Markdown text={data.aboutUsSection.text2} />
          </div>
          <div className="relative aspect-[1.35] w-full object-center xl:aspect-square mdOnly:order-2">
            <Image
              src={data.aboutUsSection.image2.url}
              alt={data.aboutUsSection.image2.alt || "image"}
              fill
              sizes="(max-width: 768px) 90vw, 312px"
              className="h-auto  object-cover"
            />
          </div>
          <div className="mdOnly:order-5">
            <Markdown text={data.aboutUsSection.text3} />
          </div>
          <div className="relative aspect-[1.35] w-full object-center xl:aspect-square mdOnly:order-6">
            <Image
              src={data.aboutUsSection.image3.url}
              alt={data.aboutUsSection.image3.alt || "image"}
              fill
              sizes="(max-width: 768px) 90vw, 312px"
              className="h-auto object-cover"
            />
          </div>
        </div>
        {/* <ul className="container flex text-left text-white">
          <li className="mr-6 w-1/3">
            <div className="h-1/2">
              <h1 className="mb-1 text-t32">{data.aboutUsSlider.Heading}</h1>
  
              <div className="mb-2 flex text-center text-t32">
                <Paw className="mr-4 p-[4px] text-white" />
                <h2>{data.aboutUsSlider.name}</h2>
              </div>
              <div className="text-t16 leading-5 opacity-80 ">
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
                <p className="mb-2">{data.aboutUsSlider.text3}</p>
                <p>{data.aboutUsSlider.text4}</p>
              </div>
            </div>
          </li>
          <li className="w-1/3">
            <div className="h-1/2">
              <h2 className="mb-2  text-t24">{data.aboutUsSlider.name3}</h2>
              <div className="text-t16 leading-5 opacity-80">
                <p className="mb-2">{data.aboutUsSlider.text5}</p>
                <p> {data.aboutUsSlider.text6}</p>
              </div>
            </div>
            <Image alt="dog" width={357} height={311} src={Dog3} />
          </li>
        </ul> */}
      </div>
    </section>
  );
};
