import Image from "next/image";
import { Markdown } from "@/components/Markdown";
import { DatoProduct } from "@/types/dato";
import { SalesDriveData } from "@/types/salesdrive";
import { Locale } from "@/i18n/routing";
import { convertPrice } from "@/utils/convertPrice/convertPrice";

type ProductDetailsViewProps = {
  product: DatoProduct;
  lang: Locale;
  salesData?: SalesDriveData | null;
};

export default function ProductDetailsView({
  product,
  lang,
  salesData,
}: ProductDetailsViewProps) {
  const eurRate = salesData?.currencies.find((currency) => currency.id === "EUR")?.rate || 1;

  const getPrice = (idCrm: string, fallbackPrice?: string | number | null): string => {
    const priced = salesData?.products.find((p) => p.id === idCrm);
    if (priced) {
      return lang === "en" ? convertPrice(priced.price, eurRate) : priced.price;
    }
    if (fallbackPrice === undefined || fallbackPrice === null) {
      return "N/A";
    }
    return String(fallbackPrice);
  };

  const currency = lang === "en" ? "UAH" : "₴";

  return (
    <article className="container py-20 xl:py-28">
      <div className="grid gap-8 xl:grid-cols-[520px_1fr] xl:gap-12">
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-white">
            <Image
              fill
              src={product.productpicture.url}
              alt={product.productpicture.alt ?? "Emmy and Lily"}
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 520px"
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.productSlider.slice(0, 3).map((slide, index) => (
              <div
                key={`${slide.id}-${index}-${slide.url}`}
                className="relative aspect-[4/5] overflow-hidden rounded"
              >
                <Image
                  fill
                  src={slide.url}
                  alt={slide.alt ?? "Emmy and Lily"}
                  className="object-cover"
                  sizes="(max-width: 1200px) 33vw, 170px"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <Markdown text={product.heading} className="mb-4 text-t32" />
          <Markdown text={product.description} className="mb-6 text-t16" />

          <table className="mb-8 w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-black/20 py-2 text-left text-t14 italic opacity-70">
                  {lang === "en" ? "Capacity" : "Об’єм"}
                </th>
                <th className="border-b border-black/20 py-2 text-left text-t14 italic opacity-70">
                  {lang === "en" ? "Price" : "Ціна"}
                </th>
              </tr>
            </thead>
            <tbody>
              {product.capacity.map((item) => (
                <tr key={item.idCrm}>
                  <td className="border-b border-black/10 py-2 text-t18">
                    {item.ml} {item.ml ? (lang === "uk" ? "мл" : "ml") : ""}
                  </td>
                  <td className="border-b border-black/10 py-2 text-t18">
                    {getPrice(item.idCrm, item.price)} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {product.activeComponents && (
            <>
              <h3 className="mb-2 text-t20 font-bold">{product.activecomp ?? ""}</h3>
              <Markdown text={product.activeComponents} className="mb-6 text-t14" />
            </>
          )}

          {product.composition && (
            <>
              <h3 className="mb-2 text-t20 font-bold">{product.composit ?? ""}</h3>
              <Markdown text={product.composition} className="mb-6 text-t14" />
            </>
          )}

          {product.methodOfUse && (
            <>
              <h3 className="mb-2 text-t20 font-bold">{product.method ?? ""}</h3>
              <Markdown text={product.methodOfUse} className="text-t14" />
            </>
          )}
        </div>
      </div>
    </article>
  );
}
