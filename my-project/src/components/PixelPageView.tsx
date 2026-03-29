"use client";

import { useEffect } from "react";
import { trackPixelCustom } from "@/lib/pixel";

export function PixelPageView({ eventName }: { eventName: string }) {
  useEffect(() => {
    trackPixelCustom(eventName);
  }, [eventName]);

  return null;
}
