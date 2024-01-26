import Image from "next/image";
import Dogs from "../../public/emmy-lili-picture.png";
import DogsHero from "../../public/emmy-lilly-2-dogs.png";
import Product from "../../public/product.png";
import { Arrow } from "../components/icons/Arrow";
import { gql } from "@apollo/client";
import { getClient } from "../utils/apollo-client";
import { Markdown } from "../components/Markdown";
import { Paw } from "@/components/icons/Paw";

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
      <div className="relative bg-bg_primary">
        <div className="container flex h-dvh items-center">
          <div className="ml-5 flex max-w-96 flex-col">
            <Markdown text={data.mainSection.heading} className="order-2" />
            <div className="order-1 mb-8 flex flex-row gap-1 text-dark">
              <Paw className="h-16 w-16 flex-shrink-0" />
              <p className="text-t70">{data.mainSection.bigtext}</p>
            </div>
            <Markdown text={data.mainSection.text} className="order-3" />
          </div>
        </div>
        <div className="absolute bottom-0 right-0 h-4/5 w-full">
          <Image
            src={DogsHero}
            alt="Image of 2 dogs in costumes. Their names are Emmy and Lili."
            fill
            className="object-contain object-right-bottom"
          />
        </div>
      </div>
      <section>
        <div className="container">
          <h2>{data.aboutUsSection.heading}</h2>
          <Markdown text={data.aboutUsSection.text} />
          <div className="relative h-[453px] w-[430px]">
            <Image
              src={data.aboutUsSection.image.url}
              alt={data.aboutUsSection.image.alt}
              fill
            />
          </div>
        </div>
      </section>
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
      <section>
        <div className="container">
          <h2>Про нас</h2>
        </div>
      </section>
      <section id="contacts">
        <div className="container">
          <h2>Контакти</h2>
        </div>
      </section>
    </div>
  );
}
