"use client";
import { useState } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";

import { i18n } from "@/i18n.config";

export default function LocaleSwitcher({ className, lang }: { className?: string, lang: string }) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  // const langText = lang === 'en' ? 'Eng' : lang === 'ua' ? 'Укр' : lang;

  return (
    <div></div>
    // <div className="relative">
    //   <button onClick={isOpen ? closeDropdown : openDropdown} className="w-[56.8px] rounded-md border-2 border-black px-3 py-2 text-black duration-300 hover:border-black hover:text-black">
    //     {langText}
    //   </button>

    //   {isOpen && (
    //     <ul className="mt-4 backdrop-opacity-0 absolute top-full left-0 w-max  rounded-md py-1">
    //       {i18n.locales.map((locale) => (
    //         <li key={locale} className={`w-[56.8px]  flex items-center justify-center h-10 rounded-md border-2 border-black mb-2 text-black duration-300 hover:border-black ${lang === locale ? 'bg-black hover:text-white hover:bg-black text-white' : 'hover:bg-gray-200'}`}>
    //           <Link className='px-4 py-2' href={redirectedPathName(locale)} locale={locale}>
    //             {locale === 'en' ? 'Eng' : locale === 'ua' ? 'Укр' : locale}
    //           </Link>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>
  );
}
