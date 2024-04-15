import { Formula } from "@/components/icons/Formula"
import { Dog } from "@/components/icons/Dogvideo"
import { Earth } from "@/components/icons/Earth"

const Video = ({ data }: { data: any }) => {
    return (
        <section className='relative w-full  h-[779px] bg-black pb-24 pt-14' >
            <div className="video-wrapper">
                <video className="w-full h-[623px] object-cover" autoPlay muted loop preload="none">
                    <source src="https://res.cloudinary.com/dg6fnnbpd/video/upload/v1711999849/xk7tihwmrpfrglqk3ekl.mp4" type="video/mp4" />
                </video>
                <div className=" text-overlay absolute top-0  left-0 w-full h-full flex flex-col justify-center items-center text-white z-10">
                    <h1 className="text-t53 mb-16 ">{data.videosection.heading}</h1>
                    <ul className="container grid grid-cols-2 gap-4  mt-4 text-t18">
                        <li className="text-center mb-14  w-[188px] mx-auto"><Formula className="mx-auto mb-4" /> <p className="w-[81px] leading-6 text-t18 mx-auto ">{data.videosection.text1}</p> </li>
                        <li className="text-center mb-14  w-[234px] mx-auto"> <p className="text-t53 mx-auto mb-4">100+</p> <p className="w-[224x] leading-6 text-t18 mx-auto">{data.videosection.text2}</p>
                        </li>
                        <li className="text-center w-[218px] mx-auto"><Dog className="mb-4 mx-auto" /> <p className="w-[198x] leading-6 text-t18 mx-auto">{data.videosection.text3}</p> </li>
                        <li className="text-center w-[224px] mx-auto">< Earth className="mx-auto mb-5" /><p className="w-[172px] leading-6 text-t18 mx-auto">{data.videosection.text4}</p></li>
                    </ul>
                </div>
            </div>
        </section>


    )
}

export default Video