import Image from "next/image";
import Product from "../../public/product.png";
import { Arrow } from "../components/icons/Arrow";
import { gql } from "@apollo/client";
import { getClient } from "../utils/apollo-client";
import { Markdown } from "../components/Markdown";
import { Paw } from "@/components/icons/Paw";
import { AboutUs } from "@/page-components/AboutUs";
import { AboutUsSlider } from "@/page-components/AboutUsSlider";
import { Contacts } from "@/page-components/Contacts";
import { ProductsSection } from "@/page-components/ProductsSection";
import { HeroSection } from "@/page-components/HeroSection";

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
