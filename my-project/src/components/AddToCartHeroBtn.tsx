"use client";
import { useState, useEffect } from "react";
import { FC } from "react";
import cn from "classnames";
import { useAddedToCart } from "@/components/context/addedToCart";
import getData from "@/utils/api/api";
interface AddToCartHeroBtnProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  data: any;
  secondtext: string;
}

export const AddToCartHeroBtn: FC<AddToCartHeroBtnProps> = ({
  text,
  className,
  data,
  secondtext,
  lang,
}) => {
  const { addedToCart, setAddedToCart } = useAddedToCart();
  const trevelSet = data.allProducts;
  const [state, setState] = useState<{
    products: { id: string; price: string; available: string; oldprice: any }[];
    currencies: { id: string; rate: number }[];
  }>({ products: [], currencies: [] });

  const fetchData = async () => {
    try {
      const data = await getData();
      setState(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const productToAdd = trevelSet.find((product: any) =>
    product.capacity.some((cap: any) => cap.idCrm === "id_12")
  );
  console.log(state);
  const addToCart = () => {
    const storedDataString = localStorage.getItem("storedData");
    const storedData = storedDataString ? JSON.parse(storedDataString) : [];
    const storedAddedToCart = localStorage.getItem("addedToCart");
    const parsedAddedToCart = storedAddedToCart
      ? JSON.parse(storedAddedToCart)
      : {};

    const productToAdd = trevelSet.find((product: any) =>
      product.capacity.some((cap: any) => cap.idCrm === "id_12")
    );

    if (productToAdd) {
      const capacityToAdd = productToAdd.capacity.find(
        (cap: any) => cap.idCrm === "id_12"
      );
      if (capacityToAdd) {
        const { ml, idCrm } = capacityToAdd;

        const productState = state.products.find((p: any) => p.id === idCrm);
        const productPrice = productState
          ? productState.price
          : capacityToAdd.price;

        const dataToStore = {
          id: idCrm,
          productName: productToAdd.heading,
          price: productPrice,
          capacity: ml,
          photo: productToAdd.productSlider[0].url,
        };

        const updatedAddedToCart = {
          ...parsedAddedToCart,
          [idCrm]: true,
        };
        const updatedData = [...storedData, dataToStore];
        localStorage.setItem("storedData", JSON.stringify(updatedData));
        localStorage.setItem("addedToCart", JSON.stringify(updatedAddedToCart));

        setAddedToCart(updatedAddedToCart);

        window.fbq("track", "AddToCart", {
          content_ids: [idCrm],
          content_type: productToAdd.heading,
          value: productPrice,
          currency: lang === "en" ? "EUR" : "UAH",
        });
      } else {
        console.error("Product capacity is not available.");
      }
    }
  };

  const isProductAdded =
    productToAdd &&
    addedToCart[
      productToAdd.capacity.find((cap: any) => cap.idCrm === "id_12")?.idCrm
    ];

  return (
    <button
      onClick={addToCart}
      className={cn(
        "relative z-20 rounded bg-black px-6 py-3 text-center text-t18 font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black",
        className
      )}
      disabled={isProductAdded}
    >
      {isProductAdded ? <span>{secondtext}</span> : <span>{text}</span>}
    </button>
  );
};
