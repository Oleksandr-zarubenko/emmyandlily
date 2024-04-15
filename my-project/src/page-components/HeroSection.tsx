import { Markdown } from "@/components/Markdown";
import { Paw } from "@/components/icons/Paw";

export const HeroSection = ({ data }: { data: any }) => {

  return (
    <>
      <div className=" hero relative bg-white text-center xl:text-left">
        <div className="container xl:min-h-[800px]">
          {/* <div className="mx-auto mb-96 mt-32 flex flex-col md:mb-[642px] md:max-w-[416px] xl:mb-0 xl:ml-0 xl:mt-0 xl:max-w-96 smOnly:p-2"> */}
          {/* <Markdown text={data.mainSection.heading} className="order-2" /> */}
          <div className="order-1 mb-8 text-center text-bg_secondary xl:justify-start w-[655px]">
            {/* <Paw className="h-12 w-12 flex-shrink-0 md:h-16 md:w-16" /> */}
            <p className="relative top-[152px] left-20 w-[655px] text-t50  md:text-t48 ">{data.mainSection.bigtext}</p>
          </div>
          <div className=" w-[340px] relative text-center left-[210px]  top-[252px] ">
            <Markdown
              text={data.mainSection.heading}
              className="order-3 !text-t16 w-[350px] mb-4 h-10 !text-bg_secondary md:!text-t24n xl:!text-t32"
            />
            <div className="mx-auto px-6 py-4 text-t18 bg-black text-white rounded w-[225px] text-center">
              {data.mainSection.btn}
            </div>
          </div>
          {/* </div> */}
        </div>

      </div >
      <div className=" w-auto h-[87px] bg-black">

      </div>
    </>
  );
};
