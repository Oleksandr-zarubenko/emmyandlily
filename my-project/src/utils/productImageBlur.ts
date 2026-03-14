const productBlurSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 150">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f6f1e8"/>
      <stop offset="55%" stop-color="#e6ddd1"/>
      <stop offset="100%" stop-color="#d4c7b7"/>
    </linearGradient>
    <linearGradient id="bottle" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#4b332d"/>
      <stop offset="100%" stop-color="#170d0c"/>
    </linearGradient>
  </defs>
  <rect width="120" height="150" rx="12" fill="url(#bg)"/>
  <rect x="19" y="30" width="30" height="86" rx="7" fill="url(#bottle)" opacity="0.9"/>
  <rect x="27" y="20" width="14" height="14" rx="3" fill="#120909" opacity="0.9"/>
  <rect x="33" y="11" width="3" height="12" rx="1.5" fill="#120909" opacity="0.9"/>
  <rect x="66" y="24" width="34" height="92" rx="8" fill="url(#bottle)"/>
  <rect x="76" y="6" width="13" height="22" rx="4" fill="#120909"/>
  <path d="M82 8c8-7 18-7 22-5 2 1 2 4 0 5-4 1-11 1-22 8z" fill="#120909"/>
  <rect x="24" y="58" width="20" height="16" rx="3" fill="#261716" opacity="0.65"/>
  <rect x="72" y="62" width="22" height="18" rx="3" fill="#261716" opacity="0.65"/>
</svg>`;

export const PRODUCT_IMAGE_BLUR_DATA_URL = `data:image/svg+xml;base64,${Buffer.from(
  productBlurSvg
).toString("base64")}`;
