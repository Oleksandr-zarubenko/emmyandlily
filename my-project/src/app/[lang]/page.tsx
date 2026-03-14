import { AboutUs } from "@/page-components/AboutUs";
import { Contacts } from "@/page-components/Contacts";
import { HeroSection } from "@/page-components/HeroSection";
import { ProductsSection } from "@/page-components/ProductsSection";
import FreeDelivery from "@/components/FreeDelivery";

import { gql } from "@apollo/client";
import { getClient } from "../../utils/apollo-client";
import { Metadata } from "next/types";
import { Locale } from "@/i18n/routing";
import { DatoHomeData } from "@/types/dato";
import { cacheLife, cacheTag } from "next/cache";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";

import Video from "@/page-components/Video";

const queryEN = gql`
  {
    mainSection {
      bigtext
      heading
      text
      btn
      inCart
      productId
      bottles {
        alt
        url
      }
    }
    videosection {
      heading
      text1
      text2
      text3
      text4
      videolink
    }
    allCategories {
      id
      name
    }
    aboutUsSection {
      heading
      text3
      text2
      text1
      image3 {
        alt
        url
      }
      image2 {
        alt
        url
      }
      image1 {
        alt
        url
      }
    }
    promoOffer {
      title
    }
    contactssection {
      heading
      text
      phone1
      email
      text2
      phone2
      socialsphrase
      tiktoklink
      instagramlink
    }
    productsSection {
      heading
      text
    }
    allProducts(first: 100) {
      preview
      heading
      description
      id
      category {
        name
        id
      }
      productpicture {
        alt
        url
      }
      method
      composit
      activecomp
      advantage1
      advantage2
      advantage3
      activeComponents
      composition
      productSlider {
        alt
        url
        id
      }

      methodOfUse
      capacity {
        ml
        idCrm
      }
    }
    secondmodal {
      goToCart
      itemAddedToCart
      returnToShopping
    }
  }
`;

const queryUA = gql`
  {
    mainSection(locale: uk) {
      bigtext
      heading
      text
      btn
      inCart
      productId
      bottles {
        alt
        url
      }
    }
    videosection(locale: uk) {
      heading
      text1
      text2
      text3
      text4
      videolink
    }
    aboutUsSection(locale: uk) {
      heading
      text3
      text2
      text1
      image3 {
        alt
        url
      }
      image2 {
        alt
        url
      }
      image1 {
        alt
        url
      }
    }
    promoOffer(locale: uk) {
      title
    }
    contactssection(locale: uk) {
      heading
      text
      phone1
      email
      text2
      phone2
      socialsphrase
      tiktoklink
      instagramlink
    }
    productsSection(locale: uk) {
      heading
      text
    }
    allCategories(locale: uk) {
      id
      name
    }
    allProducts(locale: uk, first: 100) {
      preview
      heading
      description
      id
      category {
        name
        id
      }
      productpicture {
        alt
        url
      }
      advantage1
      advantage2
      advantage3
      method
      composit
      activecomp
      activeComponents
      composition
      productSlider {
        alt
        url
        id
      }

      methodOfUse
      capacity {
        ml
        idCrm
      }
    }
    secondmodal(locale: uk) {
      goToCart
      itemAddedToCart
      returnToShopping
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const local = lang as Locale;
  const metadataByLocale = {
    uk: {
      title: "Emmy & Lily | Шампуні та догляд для собак",
      description:
        "Emmy & Lily - шампуні та засоби догляду для собак. Дбайливі формули для чистої, блискучої та доглянутої шерсті.",
    },
    en: {
      title: "Emmy & Lily | Dog Shampoos and Coat Care",
      description:
        "Emmy & Lily offers dog shampoos and coat care products designed to keep your dog's coat clean, soft, and healthy-looking.",
    },
  } as const;
  const meta = metadataByLocale[local];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: getCanonicalUrl(local),
      languages: getLanguageAlternates(),
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: getCanonicalUrl(local),
      siteName: "Emmy & Lily",
      images: [
        {
          url: "/favicon/android-chrome-512x512.png",
          width: 512,
          height: 512,
        },
        {
          url: "/favicon/android-chrome-192x192.png",
          width: 192,
          height: 192,
          alt: "Emmy and Lily - dog`s shampoo brand.",
        },
      ],
      locale: local === "uk" ? "uk_UA" : "en_US",
      type: "website",
    },
  };
}

async function getHomeData(local: Locale): Promise<DatoHomeData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:home:${local}`);

  const query = local === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<DatoHomeData>({ query });
  if (!data) {
    throw new Error("Failed to load homepage data from DatoCMS");
  }
  return data;
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const local = lang as Locale;
  const data = await getHomeData(local);
  const siteUrl = getCanonicalUrl(local);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "Emmy & Lily",
        url: siteUrl,
        logo: `${siteUrl}/favicon/android-chrome-512x512.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Emmy & Lily",
        publisher: {
          "@id": `${siteUrl}#organization`,
        },
        inLanguage: local,
      },
    ],
  };

  return (
    <div className="bg-bg_secondary flex grow flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <HeroSection data={data} lang={local} />
      <Video data={data} />
      {data?.promoOffer?.title && (
        <FreeDelivery text={data?.promoOffer?.title} />
      )}

      <ProductsSection data={data} lang={local} />
      <AboutUs data={data} />
      <Contacts data={data} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq('trackCustom', 'HomePageView');
            }
          `,
        }}
      />
    </div>
  );
}
