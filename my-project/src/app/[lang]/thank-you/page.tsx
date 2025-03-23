import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n.config";
import { Markdown } from "@/components/Markdown";
import Link from "next/link";
import BgImg from "/public/About us2.png";
import DogsImg from "/public/emmy-lilly-2-dogs-bg-hero.webp";
import Image from "next/image";
import { Logo } from "@/components/icons/Logo";
import { ClearLocalStorage } from "@/components/ClearLocalStorage";

const queryEN = gql`
  {
    thankyoupage {
      additionaltext
      buttontext
      maintext
    }
  }
`;

const queryUA = gql`
  {
    thankyoupage(locale: uk) {
      additionaltext
      buttontext
      maintext
    }
  }
`;

export default async function ThankYouPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const query = lang === "ua" ? queryUA : queryEN;
  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return (
    <section className="relative grow">
      <ClearLocalStorage />

      <Image
        src={BgImg}
        alt="dogs"
        className="luminosity absolute bottom-0 right-0 top-0 ml-auto h-full w-1/3 object-cover opacity-40 blur-sm grayscale"
      />
      <div className="container relative flex flex-col gap-3 py-32">
        <Image
          src={DogsImg}
          alt="dogs"
          className="luminosity absolute left-[calc(50%-115px)] h-[230px] w-auto bg-white shadow-order grayscale md:left-[52%] md:h-[467px] smOnly:top-96"
        />
        <div className="flex flex-col gap-4 py-20 md:w-1/2">
          <Markdown text={data.thankyoupage.maintext} />
          <Link href={lang === "ua" ? "/ua" : "/"} className="ml-auto w-32">
            <Logo color="black" />
          </Link>
          <Markdown
            text={data.thankyoupage.additionaltext}
            className="smOnly:mb-44"
          />
          <Link
            href={lang === "ua" ? "/ua" : "/"}
            className="relative z-20 inline-block rounded bg-black px-6 py-3 text-center text-t18 font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black md:ml-auto md:max-w-max"
          >
            {data.thankyoupage.buttontext}
          </Link>
        </div>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq('track', 'Thank You Page View');
            }
          `,
        }}
      />
    </section>
  );
}
