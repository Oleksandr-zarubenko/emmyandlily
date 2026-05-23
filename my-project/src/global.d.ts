// global.d.ts
interface Window {
  fbq: (...args: unknown[]) => void;
}

declare module "swiper/css";
declare module "swiper/css/pagination";
