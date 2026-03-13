"use client";

import { useRouter } from "next/navigation";
import { Locale } from "@/i18n/routing";

type ModalCloseButtonProps = {
  lang: Locale;
};

export default function ModalCloseButton({ lang }: ModalCloseButtonProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label={`Close modal (${lang})`}
      className="absolute right-4 top-4 z-50 rounded bg-black px-3 py-2 text-sm text-white"
    >
      Close
    </button>
  );
}
