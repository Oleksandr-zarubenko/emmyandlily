import { AboutUs } from "@/page-components/AboutUs";
import { AboutUsSlider } from "@/page-components/AboutUsSlider";
import { Contacts } from "@/page-components/Contacts";
import { HeroSection } from "@/page-components/HeroSection";
import { ProductsSection } from "@/page-components/ProductsSection";
import { gql } from "@apollo/client";
import { getClient } from "../utils/apollo-client";
import dynamic from "next/dynamic";

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
    }
  }
`;

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
