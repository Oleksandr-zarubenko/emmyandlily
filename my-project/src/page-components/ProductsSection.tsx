import { Markdown } from "@/components/Markdown";
import { Path } from "@/components/icons/Path";
import { PathBorder } from "@/components/icons/PathBorder";
import { PathMd } from "@/components/icons/PathMd";
import { PathBorderMd } from "@/components/icons/PathBorderMd";
import { Paw } from "@/components/icons/Paw";
import Image from "next/image";
import { ProductModal } from "@/components/ProductModal";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { FormModal } from "@/components/FormModal";

export const ProductsSection = async ({
  data,
  lang,
}: {
  data: any;
  lang: Locale;
}) => {
  const { product: productT } = await getDictionary(lang);
  const { orderForm } = await getDictionary(lang);
  return (
    <section className="bg-black text-center xl:py-16" id="products">
      <div className="container">
        <div className="xl:justify-left mb-4 flex flex-row items-center gap-1 md:gap-4 xl:mb-10">
          <Paw className="h-8 w-8 p-[4px] text-white md:h-11 md:w-11" />
          <Markdown
            text={data.productsSection.heading}
            className="mb-0 text-t32 text-white"
          />
        </div>
        {data.productsSection.text && (
          <Markdown text={data.productsSection.text} />
        )}

        <div className="grid gap-4 rounded  bg-black text-left md:grid-cols-3 md:gap-6 smOnly:grid-rows-3 ">
          {data.allProducts.length > 0 &&
            [...data.allProducts]
              .sort((a: any, b: any) => a.order - b.order)
              .map((product: any) => (
                <article
                  key={product.id}
                  className="mx-auto w-[304px] cursor-pointer shadow-custom mdOnly:w-[193px]"
                >
                  <ProductModal product={product}>
                    <div className="product_wrapper relative mb-4 h-[253px] overflow-hidden rounded   xl:h-[344px] xl:w-[304px] mdOnly:h-[160px] mdOnly:w-[193px]">
                      <Image
                        fill
                        src={product.productpicture.url}
                        alt={product.productpicture.alt || "Emmy and Lili"}
                        className="product h-[253px] w-[304px]  object-cover xl:h-[344px] mdOnly:h-[160px] mdOnly:w-[193px]"
                        sizes="(max-width: 768px) 90vw, 305px"
                      />
                    </div>
                    <div className="px-4">
                      <Markdown
                        text={product.heading}
                        className="mb-2 text-t24 text-white"
                      />
                      <Markdown
                        text={product.description}
                        className="mb-4 !text-t14 text-[#FBFBFB] opacity-80 md:!text-t12"
                      />
                      <ul className="mb-4 flex">
                        {product.price &&
                          product.price.products &&
                          product.price.products.map((ml: any) => (
                            <li
                              key={ml.id}
                              className="mr-8 text-t16 italic text-white"
                            >
                              {ml.capacity}
                            </li>
                          ))}
                      </ul>
                      {product.price &&
                        product.price.products &&
                        product.price.products[0] && (
                          <p className="text-t18 leading-6 text-white">
                            від {product.price.products[0].price} ₴
                          </p>
                        )}
                    </div>
                  </ProductModal>
                </article>
              ))}
        </div>

        {/* <FormModal orderForm={orderForm} /> */}
      </div>
    </section>
  );
};
{
  /* <div className="grid gap-4 text-left md:grid-cols-3 md:gap-6 xl:gap-0 smOnly:grid-rows-3">
  {data.allProducts.length > 0 &&
    [...data.allProducts]
      .sort((a: any, b: any) => a.order - b.order)
      .map((product: any) => (
        <article
          key={product.id}
          className="mx-auto w-[304px] mdOnly:w-[193px]"
        >
          <div className="relative mb-5">
            <div className="product_wrapper relative h-[253px] overflow-hidden rounded-3xl xl:w-[304px] mdOnly:h-[160px] mdOnly:w-[193px]">
              <Image
                fill
                src={product.productpicture.url}
                alt={product.productpicture.alt || "Emmy and Lili"}
                className="product h-[253px] w-[304px] object-cover mdOnly:h-[160px] mdOnly:w-[193px]"
                sizes="(max-width: 768px) 90vw, 305px"
              />
              <Path />
              <PathMd />
              <PathBorder className="absolute left-0 top-0 h-full w-full mdOnly:hidden" />
                      <PathBorderMd className="absolute left-0 top-0 hidden h-full w-full mdOnly:block" />
            </div>
            <ProductModal product={product} productT={productT} />
          </div>
          <Markdown text={product.heading} className="mb-3" />
          <Markdown
            text={product.description}
            className="!text-t16 md:!text-t12"
          />
        </article>
      ))}
</div> */
}
