import React from "react";

const FreeDelivery = ({ text }: { text: string }) => {
  return (
    <div className="flex w-auto items-center justify-center bg-white py-[16px] text-center text-t20  text-black xl:text-t32 mdOnly:text-t24">
      {text}
    </div>
  );
};

export default FreeDelivery;
