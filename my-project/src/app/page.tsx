import Image from "next/image";
import Dogs from "../../public/emmy-lili-picture.png";
import Product from "../../public/product.png";
import { Arrow } from "../../components/icons/Arrow";
import { gql } from "@apollo/client";
import { getClient } from "../../utils/apollo-client";

const query = gql`
  {
    mainSection {
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
  console.log("data", data);
  return (
    <div className="flex flex-grow flex-col bg-bg_secondary">
      <div className="bg-bg_primary">
        <div className="container">
          <h1>{data.mainSection.heading}</h1>
          <p>{data.mainSection.text}</p>
        </div>
      </div>
      <section className="">
        <div className="container">
          <h2>{data.aboutUsSection.heading}</h2>
          <p>{data.aboutUsSection.text}</p>
          <div className="relative h-[453px] w-[430px]">
            <Image
              src={data.aboutUsSection.image.url}
              alt={data.aboutUsSection.image.alt}
              fill
            />
          </div>
        </div>
      </section>
      <section className="">
        <div className="container">
          <h2>Наші продукти</h2>
          <div className="grid grid-cols-3">
            <article>
              <div className="relative w-[304px]">
                <div className="relative h-[253px]">
                  <Image
                    src={Product}
                    alt="Image of dog`s shampoo"
                    fill
                    className=""
                  />
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
                  <Image
                    src={Product}
                    alt="Image of dog`s shampoo"
                    fill
                    className=""
                  />
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
                  <Image
                    src={Product}
                    alt="Image of dog`s shampoo"
                    fill
                    className=""
                  />
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
      <section className="">
        <div className="container">
          <h2>Про нас</h2>
        </div>
      </section>
      <section className="" id="contacts">
        <div className="container">
          <h2>Контакти</h2>
        </div>
      </section>
    </div>
  );
}
