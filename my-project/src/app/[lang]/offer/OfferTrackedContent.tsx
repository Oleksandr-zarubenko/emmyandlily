"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { Markdown } from "@/components/Markdown";
import { Locale } from "@/i18n/routing";
import type { MouseEvent } from "react";

interface OfferTrackedContentProps {
  text: string;
  lang: Locale;
}

export function OfferTrackedContent({ text, lang }: OfferTrackedContentProps) {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const link = target.closest("a");
    if (!link) {
      return;
    }

    sendGAEvent("event", "offer_link_click", {
      page: "offer",
      lang,
      link_url: link.getAttribute("href") || "",
      link_text: (link.textContent || "").trim().slice(0, 100),
    });
  };

  return (
    <div onClick={handleClick}>
      <Markdown text={text || "offer"} />
    </div>
  );
}
