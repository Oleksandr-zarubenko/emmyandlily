"use client";

type PixelTrackParams = Record<string, unknown>;
type PixelCommand = "track" | "trackCustom";

const callFbq = (
  command: PixelCommand,
  eventName: string,
  params?: PixelTrackParams
) => {
  if (typeof window === "undefined") {
    return;
  }

  const fbq = (window as Window & { fbq?: (...args: unknown[]) => void }).fbq;
  if (!fbq) {
    return;
  }

  fbq(command, eventName, params);
};

export const trackPixel = (eventName: string, params?: PixelTrackParams) => {
  callFbq("track", eventName, params);
};

export const trackPixelCustom = (
  eventName: string,
  params?: PixelTrackParams
) => {
  callFbq("trackCustom", eventName, params);
};
