import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import { Markdown } from "@/components/Markdown";
import BgImg from "../../../../public/About us2.png";
import DogsImg from "../../../../public/emmy-lilly-2-dogs-bg-hero.webp";
import Image from "next/image";
import { Logo } from "@/components/icons/Logo";
import { ClearLocalStorage } from "@/components/ClearLocalStorage";
import { Link } from "@/i18n/navigation";
import { cacheLife } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
import { PixelPageView } from "@/components/PixelPageView";

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

async function getThankYouData(local: Locale): Promise<Data> {
  "use cache";
  cacheLife("minutes");

  const query = local === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<Data>({ query });
  if (!data) {
    throw new Error("Failed to load thank-you data from DatoCMS");
  }
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const local = lang as Locale;
  const metadataByLocale = {
    uk: {
      title: "Дякуємо за замовлення | Emmy & Lily",
      description:
        "Сторінка підтвердження замовлення Emmy & Lily. Ваше замовлення прийнято в обробку.",
    },
    en: {
      title: "Thank You for Your Order | Emmy & Lily",
      description:
        "Emmy & Lily order confirmation page. Your order has been received and is being processed.",
    },
  } as const;

  return {
    title: metadataByLocale[local].title,
    description: metadataByLocale[local].description,
    alternates: {
      canonical: getCanonicalUrl(local, "/thank-you"),
      languages: getLanguageAlternates("/thank-you"),
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const local = lang as Locale;
  const data = await getThankYouData(local);

  return (
    <section className="relative grow">
      <Image
        src={BgImg}
        alt="dogs"
        className="luminosity absolute top-0 right-0 bottom-0 ml-auto h-full w-1/3 object-cover opacity-40 blur-sm grayscale"
      />
      <div className="relative container flex flex-col gap-3 py-32">
        <Image
          src={DogsImg}
          alt="dogs"
          className="luminosity shadow-order smOnly:top-96 absolute left-[calc(50%-115px)] h-57.5 w-auto bg-white grayscale md:left-[52%] md:h-116.75"
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
            className="text-t18 relative z-20 inline-block rounded bg-black px-6 py-3 text-center font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black md:ml-auto md:max-w-max"
          >
            {data?.thankyoupage.buttontext || "Home"}
          </Link>
        </div>
      </div>
      <PixelPageView eventName="ThankYouPageView" />
    </section>
  );
}
