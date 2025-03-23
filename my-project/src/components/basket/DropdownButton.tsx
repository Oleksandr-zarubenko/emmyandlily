"use client";
import { useState } from "react";
import { ChevronDown } from "@/components/icons/Chevron-down";
import { ChevronUp } from "@/components/icons/ChevronUp";
import { Delivery } from "@/components/icons/Delivery";
import { Wallet } from "@/components/icons/Wallet";
import { Security } from "@/components/icons/Security";
import { Lock } from "@/components/icons/Lock";
import { Markdown } from "../Markdown";

const DropdownButton = ({
  buttonText,
  dropdownText,
  icon,
}: {
  buttonText: string;
  dropdownText: any;
  icon: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const chevron = isOpen ? (
    <ChevronDown className="" />
  ) : (
    <ChevronUp className="" />
  );
  return (
    <>
      <button
        className="mb-6 h-10 w-full border-b-[1px] border-[#DCDCDC] text-left text-t18"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {icon}{" "}
            <p className="ml-2 text-t16 font-bold xl:text-t18"> {buttonText}</p>
          </div>{" "}
          {chevron}
        </div>
      </button>
      {isOpen && (
        <div className="mb-6 flex pb-4">
          <Markdown
            text={dropdownText}
            className="ml-4 list-disc text-left leading-[1.4] xl:ml-24 mdOnly:ml-12"
          />
        </div>
      )}
    </>
  );
};

const DropDown = ({ data }: any) => {
  return (
    <div>
      <h2 className="mb-8 text-t24 -tracking-5 xl:mb-10 xl:text-t32 xl:font-bold smOnly:font-bold mdOnly:font-bold ">
        {data.basket.additionalInformation}
      </h2>

      <DropdownButton
        icon={<Delivery />}
        buttonText={data.basket.delivery}
        dropdownText={data.basket.dropdown}
      />
      <DropdownButton
        icon={<Wallet />}
        buttonText={data.basket.payment}
        dropdownText={data.basket.dropdown1}
      />
      <DropdownButton
        icon={<Security />}
        buttonText={data.basket.guarantee}
        dropdownText={data.basket.dropdown2}
      />
      <DropdownButton
        icon={<Lock />}
        buttonText={data.basket.privacy}
        dropdownText={data.basket.dropdown3}
      />
    </div>
  );
};

export default DropDown;
