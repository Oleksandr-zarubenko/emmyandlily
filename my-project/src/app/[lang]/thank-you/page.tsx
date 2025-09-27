import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import { Markdown } from "@/components/Markdown";
import BgImg from "/public/About us2.png";
import DogsImg from "/public/emmy-lilly-2-dogs-bg-hero.webp";
import Image from "next/image";
import { Logo } from "@/components/icons/Logo";
import { ClearLocalStorage } from "@/components/ClearLocalStorage";
import Script from "next/script";
import { Link } from "@/i18n/navigation";

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
type Data = {
  thankyoupage: {
    maintext: string;
    buttontext: string;
    additionaltext: string;
  };
};
export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const query = lang === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<Data>({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return (
    <section className="relative grow">
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
          <Markdown text={data?.thankyoupage.maintext || ""} />
          <Link href="/" className="ml-auto w-32">
            <Logo color="black" />
          </Link>
          <ClearLocalStorage
            additionalText={data?.thankyoupage.additionaltext || ""}
          />
          <Link
            href="/"
            className="relative z-20 inline-block rounded bg-black px-6 py-3 text-center text-t18 font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black md:ml-auto md:max-w-max"
          >
            {data?.thankyoupage.buttontext || "Home"}
          </Link>
        </div>
      </div>
      <Script
        id="facebook-pixel"
        dangerouslySetInnerHTML={{
          __html: `if (typeof window !== "undefined" && window.fbq) { window.fbq('track', 'Thank You Page View'); }`,
        }}
      />
    </section>
  );
}
