"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";

import { i18n } from "@/i18n.config";

export default function LocaleSwitcher({ className }: { className?: string }) {
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className={cn("flex gap-x-3", className)}>
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            <Link
              href={redirectedPathName(locale)}
              className="rounded-md border-2 border-primary px-3 py-2 text-primary duration-300 hover:border-black hover:text-black"
            >
              {locale}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
