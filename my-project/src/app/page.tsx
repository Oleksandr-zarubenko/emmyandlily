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
      <div className="hero relative bg-bg_primary">
        <div className="container flex h-[800px] items-center">
          <div className="ml-5 flex max-w-96 flex-col">
            <Markdown text={data.mainSection.heading} className="order-2" />
            <div className="order-1 mb-8 flex flex-row gap-1 text-dark">
              <Paw className="h-16 w-16 flex-shrink-0" />
              <p className="text-t70">{data.mainSection.bigtext}</p>
            </div>
            <Markdown text={data.mainSection.text} className="order-3" />
          </div>
        </div>
      </div>
      <AboutUs data={data} />
      <section>
        <div className="container">
          <h2>Наші продукти</h2>
          <div className="grid grid-cols-3">
            <article>
              <div className="relative w-[304px]">
                <div className="relative h-[253px]">
                  <Image src={Product} alt="Image of dog`s shampoo" fill />
                </div>
                <div className="absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <div className="h-5 w-5">
                    <Arrow />
                  </div>
                </div>
              </div>
            </article>
            <article>
              <div className="relative w-[304px]">
                <div className="relative h-[253px]">
                  <Image src={Product} alt="Image of dog`s shampoo" fill />
                </div>
                <div className="absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <div className="h-5 w-5">
                    <Arrow />
                  </div>
                </div>
              </div>
            </article>
            <article>
              <div className="relative w-[304px]">
                <div className="relative h-[253px]">
                  <Image src={Product} alt="Image of dog`s shampoo" fill />
                </div>
                <div className="absolute bottom-0 right-0 flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                  <div className="h-5 w-5">
                    <Arrow />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <AboutUsSlider data={data} />
      <Contacts data={data} />
    </div>
  );
}
