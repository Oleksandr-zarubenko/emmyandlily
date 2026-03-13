"use server";
import "server-only";
import { parseString } from "xml2js";
import { Locale } from "@/i18n/routing";
import { cacheLife, cacheTag } from "next/cache";
import {
  SalesDriveCurrency,
  SalesDriveCurrencyXml,
  SalesDriveData,
  SalesDriveOfferXml,
  SalesDriveProduct,
  SalesDriveXml,
} from "@/types/salesdrive";

const KEY_UKR_CRM =
  "JAvWTZJQXYHA15-Adae5O-JRlHOuDA97l1SBWVXpy_Okn3WEsPjQKZmcbiOGYCfWYNC6_M42GBn5";
const KEY_EN_CRM =
  "tMB0fTRX_ej-ZsQRllq-LuP_FVOBq5GlEcv79omXh60IVTAPsh22SYtj2R7Dm24RZAVd0J";

export async function getSalesDriveData(lang: Locale): Promise<SalesDriveData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`salesdrive:${lang}`);

  const selectedAPI = lang === "uk" ? KEY_UKR_CRM : KEY_UKR_CRM;

  const response = await fetch(
    `https://emmyandlily.salesdrive.me/export/yml/export.yml?publicKey=${selectedAPI}&timestamp=${Date.now()}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error(`SalesDrive request failed: ${response.status}`);
  }
  const xmlData = await response.text();

  const parsedData = await parseXml(xmlData);
  const products = extractProducts(parsedData);
  const currencies = extractCurrencies(parsedData);

  return { products, currencies };
}

async function parseXml(xmlData: string): Promise<SalesDriveXml> {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result as SalesDriveXml);
      }
    });
  });
}

function extractProducts(xmlData: SalesDriveXml): SalesDriveProduct[] {
  const offers = xmlData.yml_catalog?.shop?.[0]?.offers?.[0]?.offer;
  if (!offers) {
    return [];
  }

  return offers.map((offer: SalesDriveOfferXml) => ({
    id: offer.$.id,
    price: offer.price?.[0] ?? "0",
    oldprice: offer.oldprice,
    available: offer.$.available,
  }));
}

function extractCurrencies(xmlData: SalesDriveXml): SalesDriveCurrency[] {
  const currencies = xmlData.yml_catalog?.shop?.[0]?.currencies?.[0]?.currency;
  if (!currencies) {
    return [];
  }

  return currencies.map((currency: SalesDriveCurrencyXml) => ({
    id: currency.$.id,
    rate: parseFloat(currency.$.rate),
  }));
}
