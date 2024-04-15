import { Markdown } from "@/components/Markdown";
import { Email } from "@/components/icons/Email";
import { Instagram } from "@/components/icons/Instagram";
import { Paw } from "@/components/icons/Paw";
import { Phone } from "@/components/icons/Phone";
import { TikTok } from "@/components/icons/TikTok";
import Link from "next/link";


export const Contacts = ({ data }: { data: any }) => {

  return (
    <section
      className="contacts paw pb-10 bg-white  md:pt-24 xl:pb-20 xl:pt-48"
      id="contacts"
    >
      <div className="container">
        <div className="max-w-[29rem]">
          <div className="mb-4 flex flex-row items-center gap-4 xl:mb-10">
            <Paw className="h-12 w-12 p-1 text-black" />
            <Markdown className="text-black text-t32" text={data.contactssection.heading} />
          </div>
          <Markdown
            text={data.contactssection.text}
            className="mb-8 text-t18 leading-6 mdOnly:max-w-[310px] max-w-[450px]"
          />
          <div className="flex">
            {data.contactssection.phone1 && (
              <Link
                href={"tel:" + data.contactssection.phone1}
                className="mb-4 flex gap-2 text-t16  text-black mr-8"
              >
                <Phone className="h-5 w-5 flex-shrink-0 text-black" />
                {data.contactssection.phone1}
              </Link>
            )}
            {data.contactssection.email && (
              <Link
                href={"mailto:" + data.contactssection.email}
                className="mb-[152px] flex gap-2 text-t16 text-black md:mb-11"
              >
                <Email className="h-5 w-5 flex-shrink-0 text-black" />
                {data.contactssection.email}
              </Link>
            )}
          </div>
          {data.contactssection.phone2 && (
            <>
              <Markdown className="text-t18 mb-4" text={data.contactssection.text2} />
              <Link
                href={"tel:" + data.contactssection.phone2}
                className="mb-8 flex gap-2  text-t16 ont-semibold text-black"
              >
                <Phone className="h-5 w-5 flex-shrink-0 text-black" />
                {data.contactssection.phone2}
              </Link>
            </>
          )}
          <Markdown
            text={data.contactssection.socialsphrase}
            className="mb-8  smOnly:max-w-[155px] smOnly:!text-t20"
          />
          <div className="flex flex-col gap-6 md:flex-row">
            {data.contactssection.instagramlink && (
              <Link
                href={data.contactssection.tiktoklink}
                rel="nofollow"
                target="_blank"
                className="flex w-max items-center gap-1 rounded-xl py-2 text-t24 text-black duration-300 hover:bg-white"
              >
                <TikTok className="h-5 w-5 flex-shrink-0 mr-2" /> TikTok
              </Link>
            )}
            {data.contactssection.instagramlink && (
              <Link
                href={data.contactssection.instagramlink}
                rel="nofollow"
                target="_blank"
                className="flex w-max items-center gap-1 rounded-xl px-8 py-2 text-t24 text-[#0B0605] duration-300 hover:bg-white"
              >
                <Instagram className="h-5 w-5 flex-shrink-0 mr-2" /> Instagram
              </Link>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};
