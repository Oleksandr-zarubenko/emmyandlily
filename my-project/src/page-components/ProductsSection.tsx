import { Markdown } from "@/components/Markdown";
import { Arrow } from "@/components/icons/Arrow";
import { Paw } from "@/components/icons/Paw";
import Image from "next/image";

export const ProductsSection = ({ data }: { data: any }) => {
  return (
    <section className="text-center xl:py-16" id="products">
      <div className="container">
        <div className="mb-4 flex flex-row items-center justify-center gap-4 xl:mb-10">
          <Paw className="h-11 w-11 text-primary" />
          <Markdown text={data.productsSection.heading} className="mb-0" />
        </div>
        {data.productsSection.text && (
          <Markdown text={data.productsSection.text} />
        )}
        <div className="grid gap-6 text-left md:grid-cols-2 xl:grid-cols-3 xl:gap-0 smOnly:grid-rows-3">
          {data.allProducts.length > 0 &&
            data.allProducts.map((product: any) => (
              <article key={product.id} className="xl:w-[304px]">
                <div className="relative mb-5 smOnly:w-11/12">
                  <div className="product_wrapper relative h-[253px] overflow-hidden rounded-3xl border-2 border-primary xl:w-[304px]">
                    <Image
                      src={product.productpicture.url}
                      alt={product.productpicture.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-4 -right-4 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary duration-300 hover:scale-110">
                    <span className="h-5 w-5">
                      <Arrow />
                    </span>
                  </button>
                </div>
                <Markdown text={product.heading} className="mb-3" />
                <Markdown text={product.description} />
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};
