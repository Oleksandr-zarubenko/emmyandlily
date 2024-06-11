import { AboutUs } from "@/page-components/AboutUs";
import { Contacts } from "@/page-components/Contacts";
import { HeroSection } from "@/page-components/HeroSection";
import { ProductsSection } from "@/page-components/ProductsSection";
import FreeDelivery from "@/components/FreeDelivery";

import { gql } from "@apollo/client";
import { getClient } from "../../utils/apollo-client";
import { Metadata } from "next/types";
import { Locale } from "../../i18n.config";

import Video from "@/page-components/Video";

const queryEN = gql`
  {
    mainSection {
      bigtext
      heading
      text
      btn
      inCart
    }
    videosection {
      heading
      text1
      text2
      text3
      text4
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
    allProducts {
      preview
      heading
      description
      id
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
      order
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
    }
    videosection(locale: uk) {
      heading
      text1
      text2
      text3
      text4
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
    allProducts(locale: uk) {
      preview
      heading
      description
      id
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
      order
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    openGraph: {
      title: "Emmy and Lili - dog`s shampoo brand.",
      description:
        "Emmy and Lili - dog`s shampoo brand. We need to be healthy and beautiful, so we have been looking for the best hair products for a long time to be shiny, smooth, and well-combed. However, we have never found a one-size-fits-all solution that meets our needs. That's how demanding we are! Then, we had the idea to invent our super formula for hair health. Our friends helped us a little, but they wouldn't have managed without us! So we invite you to the world of beauty! Try our formula, and let us know if you like it!",
      url: "https://www.emmyandlily.com/",
      siteName: "Emmy and Lili - dog`s shampoo brand.",
      images: [
        {
          url: `${process.env.HOSTNAME}/favicon/android-chrome-512x512.png`,
          width: 512,
          height: 512,
        },
        {
          url: `${process.env.HOSTNAME}/favicon/android-chrome-192x192.png`,
          width: 192,
          height: 192,
          alt: "Emmy and Lili - dog`s shampoo brand.",
        },
      ],
      locale: "en",
      type: "website",
    },
  };
}

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const query = lang == "ua" ? queryUA : queryEN;

  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return (
    <div className="flex flex-grow flex-col bg-bg_secondary">
      <HeroSection data={data} />
      <Video data={data} />
      {data?.promoOffer?.title && (
        <FreeDelivery text={data?.promoOffer?.title} />
      )}

      <ProductsSection data={data} lang={lang} />
      <AboutUs data={data} />
      <Contacts data={data} />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq('track', 'Home Page View');
            }
          `,
        }}
      />
    </div>
  );
}
