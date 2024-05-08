import { gql } from "@apollo/client";
import Basket from "@/page-components/Basket";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n.config";
const queryEN = gql`
  {
    basket {
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
      dropdown
    dropdown1
    dropdown2
    dropdown3
    }

    productsSection {
      heading
      text
    }
    allProducts {
      idAvailable

      heading
      description
      id
      productpicture {
        alt
        url
      }
      method
      composit
      activecomp
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
        idCrm
      }
    }
   allPromocods {
    promoCodName {
      promocod
      namePartner
        discount
    }
  }
   secondmodal {
    goToCart
    itemAddedToCart
    returnToShopping
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
dropdown
    dropdown1
    dropdown2
    dropdown3
      toOrder
      total
    }

    productsSection(locale: uk) {
      heading
      text
    }
    allProducts(locale: uk)   {
      idAvailable

      heading
      description
      id
      productpicture {
        alt
        url
      }
      method
      composit
      activecomp
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
        idCrm
      }
    }
      allPromocods(locale: uk) {
    promoCodName {
      promocod
      namePartner
        discount
    }
    
  }
    secondmodal(locale: uk) {
    goToCart
    itemAddedToCart
    returnToShopping
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

  return <Basket data={data} lang={lang} />;
}
