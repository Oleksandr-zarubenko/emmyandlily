import { Formula } from "@/components/icons/Formula";
import { Dog } from "@/components/icons/Dogvideo";
import { Earth } from "@/components/icons/Earth";

const Video = ({ data }: { data: any }) => {
  return (
    <section className="relative w-full bg-black py-24">
      <div className="absolute bottom-24 left-0 right-0 top-24">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          preload="none"
        >
          <source
            src="https://res.cloudinary.com/da0fw4mep/video/upload/v1719906915/rshkatgqotlwvjsxpr0z.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center bg-video_overlay text-center text-white">
        <h2 className="mb-10 mt-8 text-t32 xl:mb-16 xl:mt-[108px] xl:text-t53 notXl:max-w-[340px]">
          {data.videosection.heading}
        </h2>
        <ul className="container mb-10 mt-4 grid grid-cols-1 gap-6 text-t18 xl:grid-cols-2 xl:gap-x-[180px] xl:gap-y-14 xl:px-[224px]">
          <li className="mx-auto text-center">
            <Formula className="mx-auto mb-4 h-12 w-12 xl:h-16 xl:w-16" />
            <p className="mx-auto text-t16 leading-6 xl:text-t18 ">
              {data.videosection.text1}
            </p>
          </li>
          <li className="mx-auto text-center">
            <p className="mx-auto mb-4 font-abril text-t53">100+</p>
            <p className="mx-auto text-t16 leading-6 xl:text-t18">
              {data.videosection.text2}
            </p>
          </li>
          <li className="mx-auto text-center">
            <Dog className="mx-auto mb-4 h-12 w-12 xl:h-16 xl:w-16" />
            <p className="mx-auto text-t16 leading-6 xl:text-t18">
              {data.videosection.text3}
            </p>
          </li>
          <li className="mx-auto text-center">
            <Earth className="mx-auto mb-4 h-12 w-12 xl:h-16 xl:w-16" />
            <p className="mx-auto text-t16 leading-6 xl:text-t18">
              {data.videosection.text4}
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Video;
