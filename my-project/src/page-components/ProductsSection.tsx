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
    <section className="text-center xl:py-16" id="products">
      <div className="container">
        <div className="mb-4 flex flex-row items-center gap-1 md:gap-4 xl:mb-10 xl:justify-center">
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
        </div>
        <FormModal orderForm={orderForm} />
      </div>
    </section>
  );
};
