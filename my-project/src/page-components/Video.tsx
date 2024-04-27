import { Formula } from "@/components/icons/Formula";
import { Dog } from "@/components/icons/Dogvideo";
import { Earth } from "@/components/icons/Earth";

const Video = ({ data }: { data: any }) => {
  return (
    <section className="relative h-[779px] w-full bg-black py-24">
      <div className="video-wrapper">
        <video
          className="h-[623px] w-full object-cover"
          autoPlay
          muted
          loop
          preload="none"
        >
          <source
            src="https://res.cloudinary.com/dg6fnnbpd/video/upload/v1711999849/xk7tihwmrpfrglqk3ekl.mp4"
            type="video/mp4"
          />
        </video>
        <div className=" text-overlay absolute left-0  top-0 z-10 flex h-full w-full flex-col items-center justify-center text-white">
          <h1 className="mb-16 text-t53 ">{data.videosection.heading}</h1>
          <ul className="container mt-4 grid grid-cols-2  gap-4 text-t18">
            <li className="mx-auto mb-14  w-[188px] text-center">
              <Formula className="mx-auto mb-4" />
              <p className="mx-auto w-[81px] text-t18 leading-6 ">
                {data.videosection.text1}
              </p>
            </li>
            <li className="mx-auto mb-14 w-[234px] text-center">
              <p className="mx-auto mb-4 text-t53">100+</p>
              <p className="mx-auto w-[224x] text-t18 leading-6">
                {data.videosection.text2}
              </p>
            </li>
            <li className="mx-auto w-[218px] text-center">
              <Dog className="mx-auto mb-4" />
              <p className="mx-auto w-[198x] text-t18 leading-6">
                {data.videosection.text3}
              </p>
            </li>
            <li className="mx-auto w-[224px] text-center">
              <Earth className="mx-auto mb-5" />
              <p className="mx-auto w-[172px] text-t18 leading-6">
                {data.videosection.text4}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Video;
