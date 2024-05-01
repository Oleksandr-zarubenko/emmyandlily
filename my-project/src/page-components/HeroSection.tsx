"use client"
import { Markdown } from "@/components/Markdown";
import Image from "next/image";
import HeroDog from "../../public/hero-dog.webp";
import { AddToCartHeroBtn } from "@/components/AddToCartHeroBtn";
import { useAddedToCart } from "@/components/context/addedToCart";

export const HeroSection = ({ data }: { data: any }) => {
  const trevelSet = data.allProducts
  const { addedToCart, setAddedToCart } = useAddedToCart();


  const addToCart = () => {
    const storedDataString = localStorage.getItem('storedData');
    const storedData = storedDataString ? JSON.parse(storedDataString) : [];
    const storedAddedToCart = localStorage.getItem("addedToCart");
    const parsedAddedToCart = storedAddedToCart ? JSON.parse(storedAddedToCart) : {};
    const productToAdd = trevelSet.find((product: any) => product.idAvailable === "id_12");

    if (productToAdd) {
      if (productToAdd.capacity && productToAdd.capacity.length > 0) {
        const firstCapacity = productToAdd.capacity[0];
        const { price, ml } = firstCapacity;
        const dataToStore = {
          id: productToAdd.idAvailable,
          productName: productToAdd.heading,
          price: price,
          capacity: ml,
          photo: productToAdd.productSlider[0].url,
        };

        const updatedAddedToCart = {
          ...parsedAddedToCart,
          [productToAdd.idAvailable]: true,
        };
        const updatedData = [...storedData, dataToStore];
        localStorage.setItem("storedData", JSON.stringify(updatedData));
        localStorage.setItem("addedToCart", JSON.stringify(updatedAddedToCart));

        setAddedToCart(updatedAddedToCart);
      } else {
        console.error('Product capacity is not available.');
      }
    }
  };


  // useEffect(() => {
  //   const storedAddedToCart = localStorage.getItem("addedToCart");
  //   if (storedAddedToCart) {
  //     setAddedToCart(JSON.parse(storedAddedToCart));
  //   }
  // }, [setAddedToCart]);

  const productToAdd = trevelSet.find((product: any) => product.idAvailable === "id_12");

  return (
    <div className="hero relative bg-white text-center">
      <div className="container relative text-grey ">
        <Image
          src={HeroDog}
          alt={"Emmy Dog"}
          className="absolute -bottom-16 -left-28 z-20 h-[360px] w-[298px] object-contain md:-bottom-20 md:-left-0 md:h-[420px] md:w-[338px] xl:-bottom-[110px] xl:left-0 xl:h-[584px] xl:w-[476px]"
          sizes="50vw"
        />
        <Markdown
          text={data.mainSection.heading}
          className="mb-10 mt-28 md:mx-auto md:max-w-[400px] xl:mb-20 xl:mr-[280px] xl:mt-36 xl:max-w-[655px]"
        />
        <p className="mb-4 font-sans  text-t24n font-bold leading-7 tracking-[0.16px] xl:mr-[180px] xl:text-t32n">
          {data.mainSection.bigtext}
        </p>
        <AddToCartHeroBtn
          id={productToAdd.idAvailable}
          addedToCart={addedToCart}

          addToCart={addToCart}
          text={data.mainSection.btn}
          className="mb-[260px] xl:mr-[180px]"
        />
      </div>
    </div>
  );
};
