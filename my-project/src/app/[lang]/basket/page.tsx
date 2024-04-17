
import { gql } from "@apollo/client";
;
import Basket from "@/page-components/Basket";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n.config";
const queryEN = gql`
  {
     basket{
    additionalInformation
payment
    delivery
    guarantee
    heading
    name
    number
    payment
    price
    privacy
    sum
delete
    toOrder
    total
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
      advantage1
      advantage2
      advantage3
      activeComponents
      composition
      productSlider {
        alt
        url
        id
      }
  
   order
        methodOfUse
      capacity {
      price
      ml
      id
    }
    discount
    }
  }
`;

const queryUA = gql`
  {
   basket(locale: uk) {
    additionalInformation
    delete
    delivery
    guarantee
    heading
    name
    number
payment
    price
    privacy
    sum
 
    toOrder
    total
  }
 
    productsSection(locale: uk) {
      heading
      text
    }
    allProducts(locale: uk) {
      heading
      description
      id
      productpicture {
        alt
        url
      }
      advantage1
      advantage2
      advantage3
      activeComponents
      composition
      productSlider {
        alt
        url
        id
      }
   
      order
        methodOfUse
        capacity {
      price
      ml
      id
    }
    discount
    }
  }
`;

export default async function BasketPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const query = lang == "ua" ? queryUA : queryEN;
  const { data } = await getClient().query({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });


  return (
    <Basket data={data} lang={lang} />
  )
}

