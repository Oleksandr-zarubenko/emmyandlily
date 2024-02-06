import { Markdown } from "@/components/Markdown";
import { Arrow } from "@/components/icons/Arrow";
import { Path } from "@/components/icons/Path";
import { PathBorder } from "@/components/icons/PathBorder";
import { PathMd } from "@/components/icons/PathMd";
import { PathBorderMd } from "@/components/icons/PathBorderMd";
import { Paw } from "@/components/icons/Paw";
import Image from "next/image";

export const ProductsSection = ({ data }: { data: any }) => {
  return (
    <section className="text-center xl:py-16" id="products">
      <div className="container">
        <div className="mb-4 flex flex-row items-center justify-center gap-1 md:gap-4 xl:mb-10">
          <Paw className="h-8 w-8 text-primary md:h-11 md:w-11" />
          <Markdown text={data.productsSection.heading} className="mb-0" />
        </div>
        {data.productsSection.text && (
          <Markdown text={data.productsSection.text} />
        )}
        <div className="grid gap-4 text-left md:grid-cols-3 md:gap-6 xl:gap-0 smOnly:grid-rows-3">
          {data.allProducts.length > 0 &&
            data.allProducts.map((product: any) => (
              <article
                key={product.id}
                className="mx-auto w-[304px] mdOnly:w-[193px]"
              >
                <div className="relative mb-5">
                  <div className="product_wrapper relative h-[253px] overflow-hidden rounded-3xl xl:w-[304px] mdOnly:h-[160px] mdOnly:w-[193px]">
                    <Image
                      fill
                      src={product.productpicture.url}
                      alt={product.productpicture.alt}
                      className="product h-[253px] w-[304px] object-cover mdOnly:h-[160px] mdOnly:w-[193px]"
                      sizes="33vw"
                    />
                    <Path />
                    <PathMd />
                    <PathBorder className="absolute left-0 top-0 h-full w-full mdOnly:hidden" />
                    <PathBorderMd className="absolute left-0 top-0 hidden h-full w-full mdOnly:block" />
                  </div>
                  <button className="absolute bottom-0 right-0 z-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary duration-300 hover:scale-110 mdOnly:h-12 mdOnly:w-12">
                    <span className="h-5 w-5">
                      <Arrow />
                    </span>
                  </button>
                </div>
                <Markdown text={product.heading} className="mb-3" />
                <Markdown text={product.description} className="!text-t16" />
              </article>
            ))}
        </div>
      </div>
    </section>
  );
};
