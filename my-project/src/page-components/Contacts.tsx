import { Markdown } from "@/components/Markdown";
import { Email } from "@/components/icons/Email";
import { Instagram } from "@/components/icons/Instagram";
import { Paw } from "@/components/icons/Paw";
import { Phone } from "@/components/icons/Phone";
import { TikTok } from "@/components/icons/TikTok";
import Image from "next/image";
import Dog from "../../public/emmy-dog-image.png";

export const Contacts = ({ data }: { data: any }) => {
  return (
    <section className="contacts pb-20 pt-16">
      <div className="container">
        <div className="max-w-md">
          <div className="mb-10 flex flex-row items-center gap-4">
            <Paw className="h-11 w-11 text-primary" />
            <Markdown text={data.contactssection.heading} />
          </div>
          <Markdown text={data.contactssection.text} />
          <a
            href={"tel:" + data.contactssection.phone1}
            className="mb-4 flex gap-2 text-t20 font-semibold text-dark"
          >
            <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
            {data.contactssection.phone1}
          </a>
          <a
            href={"tel:" + data.contactssection.email}
            className="mb-4 flex gap-2 text-t20 font-semibold text-dark"
          >
            <Email className="h-5 w-5 flex-shrink-0 text-primary" />
            {data.contactssection.email}
          </a>
          <Markdown text={data.contactssection.text2} />
          <a
            href={"tel:" + data.contactssection.phone2}
            className="mb-8 flex gap-2 text-t20 font-semibold text-dark"
          >
            <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
            {data.contactssection.phone2}
          </a>
          <Markdown
            text={data.contactssection.socialsphrase}
            className="font-bold"
          />
          <div className="flex flex-row gap-6">
            {data.contactssection.instagramlink && (
              <a
                href={data.contactssection.tiktoklink}
                className="flex w-max items-center gap-1 rounded-xl bg-primary px-8 py-2 text-t16 text-bg_secondary"
              >
                <TikTok className="h-5 w-5 flex-shrink-0" /> TikTok
              </a>
            )}
            {data.contactssection.instagramlink && (
              <a
                href={data.contactssection.instagramlink}
                className="flex w-max items-center gap-1 rounded-xl bg-primary px-8 py-2 text-t16 text-bg_secondary"
              >
                <Instagram className="h-5 w-5 flex-shrink-0" /> Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
