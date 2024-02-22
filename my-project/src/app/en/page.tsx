import { AboutUs } from "@/page-components/AboutUs";
import { AboutUsSlider } from "@/page-components/AboutUsSlider";
import { Contacts } from "@/page-components/Contacts";
import { HeroSection } from "@/page-components/HeroSection";
import { ProductsSection } from "@/page-components/ProductsSection";
import { gql } from "@apollo/client";
import { getClient } from "../../utils/apollo-client";
import { Metadata } from "next";

const query = gql`
  {
    mainSection {
      bigtext
      heading
      text
    }
    aboutUsSection {
      heading
      text
      image {
        alt
        author
        url
      }
    }
    aboutUsSlider {
      text
      heading
      sliderimages {
        alt
        url
      }
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
      activeComponents
      composition
      productSlider {
        alt
        url
        id
      }
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
          url: `/favicon/android-chrome-256x256.png`,
          width: 256,
          height: 256,
        },
        {
          url: `/favicon/android-chrome-192x192.png`,
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

export default async function Home() {
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
      <AboutUs data={data} />
      <ProductsSection data={data} />
      <AboutUsSlider data={data} />
      <Contacts data={data} />
    </div>
  );
}
