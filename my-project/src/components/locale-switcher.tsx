"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import autoAnimate from "@formkit/auto-animate";

import { Locale, locales } from "@/i18n/routing";
import cn from "classnames";
import { Link } from "@/i18n/navigation";

export default function LocaleSwitcher({ lang }: { lang: Locale }) {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const parent = useRef(null);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return `/${locale}`;

    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const langText = lang === "en" ? "Eng" : "Укр";

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current);
    }
  }, [parent]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleIsOpen}
        className="w-[56.8px] rounded-md border-2 border-black px-3 py-2 text-black duration-300 hover:border-black hover:text-black"
      >
        {langText}
      </button>

      <div ref={parent}>
        {isOpen && (
          <ul className="absolute top-full left-0 mt-4 w-max rounded-md py-1 backdrop-opacity-0">
            {locales.map((locale) => (
              <li
                key={locale}
                className={cn(
                  "mb-2 flex h-10 w-[56.8px] items-center justify-center rounded-md border-2 border-black text-black duration-300 hover:bg-gray-200",
                  lang === locale && "bg-black text-white hover:text-black"
                )}
              >
                <Link
                  className="px-4 py-2"
                  href={redirectedPathName(locale)}
                  locale={locale}
                  onClick={toggleIsOpen}
                >
                  {locale === "en" ? "Eng" : locale === "uk" ? "Укр" : locale}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
