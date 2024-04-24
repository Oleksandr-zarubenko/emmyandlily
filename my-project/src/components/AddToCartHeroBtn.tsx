"use client";

export const AddToCartHeroBtn = ({ text }: { text: string }) => {
  return (
    <button className="z-10 mx-auto w-[225px] rounded bg-black px-6 py-4 text-center text-t18 text-white">
      {text}
    </button>
  );
};
