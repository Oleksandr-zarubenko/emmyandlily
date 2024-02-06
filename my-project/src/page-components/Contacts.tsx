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
      className="contacts pb-10 md:pt-24 xl:pb-20 xl:pt-48"
      id="contacts"
    >
      <div className="container">
        <div className="max-w-md">
          <div className="mb-4 flex flex-row items-center gap-4 xl:mb-10">
            <Paw className="h-11 w-11 text-primary" />
            <Markdown text={data.contactssection.heading} />
          </div>
          <Markdown
            text={data.contactssection.text}
            className="mb-8 mdOnly:max-w-[310px]"
          />
          {data.contactssection.phone1 && (
            <Link
              href={"tel:" + data.contactssection.phone1}
              className="mb-4 flex gap-2 text-t20 font-semibold text-dark"
            >
              <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
              {data.contactssection.phone1}
            </Link>
          )}
          {data.contactssection.email && (
            <Link
              href={"mailto:" + data.contactssection.email}
              className="mb-[152px] flex gap-2 text-t20 font-semibold text-dark md:mb-11"
            >
              <Email className="h-5 w-5 flex-shrink-0 text-primary" />
              {data.contactssection.email}
            </Link>
          )}
          {data.contactssection.phone2 && (
            <>
              <Markdown text={data.contactssection.text2} />
              <Link
                href={"tel:" + data.contactssection.phone2}
                className="mb-8 flex gap-2 text-t20 font-semibold text-dark"
              >
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                {data.contactssection.phone2}
              </Link>
            </>
          )}
          <Markdown
            text={data.contactssection.socialsphrase}
            className="mb-8 font-bold smOnly:max-w-[155px] smOnly:!text-t20"
          />
          <div className="flex flex-col gap-6 md:flex-row">
            {data.contactssection.instagramlink && (
              <Link
                href={data.contactssection.instagramlink}
                rel="nofollow"
                target="_blank"
                className="flex w-max items-center gap-1 rounded-xl bg-primary px-8 py-2 text-t16 text-bg_secondary"
              >
                <Instagram className="h-5 w-5 flex-shrink-0" /> Instagram
              </Link>
            )}
            {data.contactssection.instagramlink && (
              <Link
                href={data.contactssection.tiktoklink}
                rel="nofollow"
                target="_blank"
                className="flex w-max items-center gap-1 rounded-xl bg-primary px-4 py-2 text-t16 text-bg_secondary md:px-8"
              >
                <TikTok className="h-5 w-5 flex-shrink-0" /> TikTok
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
