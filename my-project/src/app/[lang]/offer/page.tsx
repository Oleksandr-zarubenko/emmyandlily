import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Markdown } from "@/components/Markdown";
import { Locale } from "@/i18n/routing";
import { cacheLife, cacheTag } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
const queryEN = gql`
  {
    offer {
      offertext
    }
  }
`;

const queryUA = gql`
  {
    offer(locale: uk) {
      offertext
    }
  }
`;

async function getOfferData(local: Locale): Promise<{ offer: { offertext: string } }> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:offer:${local}`);

  const query = local === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<{ offer: { offertext: string } }>({
    query,
  });
  if (!data) {
    throw new Error("Failed to load offer data from DatoCMS");
  }
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const metadataByLocale = {
    uk: {
      title: "Публічна оферта | Emmy & Lily",
      description:
        "Ознайомтеся з умовами публічної оферти Emmy & Lily для оформлення та покупки товарів на сайті.",
    },
    en: {
      title: "Public Offer | Emmy & Lily",
      description:
        "Read the Emmy & Lily public offer with the terms and conditions for placing and completing orders on the website.",
    },
  } as const;

  return {
    title: metadataByLocale[lang].title,
    description: metadataByLocale[lang].description,
    alternates: {
      canonical: getCanonicalUrl(lang, "/offer"),
      languages: getLanguageAlternates("/offer"),
    },
  };
}

export default async function OfferPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const local = lang as Locale;
  const data = await getOfferData(local);

  return (
    <>
      <section className="grow py-32">
        <div className="container flex flex-col gap-3">
          <Markdown text={data?.offer.offertext || "offer"} />
        </div>
      </section>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq('trackCustom', 'Offer Page View');
            }
          `,
        }}
      />
    </>
  );
}
