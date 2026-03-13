import { gql } from "@apollo/client";
import { cacheLife, cacheTag } from "next/cache";
import { Locale } from "@/i18n/routing";
import { DatoProduct, DatoSecondModal } from "@/types/dato";
import { getProductIdFromSlug } from "@/utils/productSlug";
import { getClient } from "@/utils/apollo-client";

const queryEN = gql`
  {
    allProducts(first: 200) {
      id
      heading
      description
      category {
        id
        name
      }
      productpicture {
        alt
        url
      }
      method
      composit
      activecomp
      activeComponents
      composition
      methodOfUse
      advantage1
      advantage2
      advantage3
      productSlider {
        id
        alt
        url
      }
      capacity {
        idCrm
        ml
      }
    }
  }
`;

const queryUA = gql`
  {
    allProducts(locale: uk, first: 200) {
      id
      heading
      description
      category {
        id
        name
      }
      productpicture {
        alt
        url
      }
      method
      composit
      activecomp
      activeComponents
      composition
      methodOfUse
      advantage1
      advantage2
      advantage3
      productSlider {
        id
        alt
        url
      }
      capacity {
        idCrm
        ml
      }
    }
  }
`;

type ProductsResponse = {
  allProducts: DatoProduct[];
};

type SecondModalResponse = {
  secondmodal: DatoSecondModal;
};

export async function getAllProducts(lang: Locale): Promise<DatoProduct[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:products:${lang}`);

  const query = lang === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<ProductsResponse>({ query });
  if (!data?.allProducts) {
    throw new Error("Failed to load products from DatoCMS");
  }
  return data.allProducts;
}

export async function getProductBySlug(
  lang: Locale,
  slug: string
): Promise<DatoProduct | null> {
  const id = getProductIdFromSlug(slug);
  if (!id) return null;
  const products = await getAllProducts(lang);
  return products.find((product) => product.id === id) ?? null;
}

const secondModalEN = gql`
  {
    secondmodal {
      goToCart
      itemAddedToCart
      returnToShopping
    }
  }
`;

const secondModalUA = gql`
  {
    secondmodal(locale: uk) {
      goToCart
      itemAddedToCart
      returnToShopping
    }
  }
`;

export async function getSecondModalData(lang: Locale): Promise<DatoSecondModal> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:secondmodal:${lang}`);

  const query = lang === "uk" ? secondModalUA : secondModalEN;
  const { data } = await getClient().query<SecondModalResponse>({ query });
  if (!data?.secondmodal) {
    throw new Error("Failed to load second modal data from DatoCMS");
  }
  return data.secondmodal;
}
