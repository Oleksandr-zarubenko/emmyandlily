import { NextResponse } from "next/server";
import axios from "axios";
import { parseString } from "xml2js";
import { Locale } from "@/i18n/routing";

const KEY_UKR_CRM =
  "JAvWTZJQXYHA15-Adae5O-JRlHOuDA97l1SBWVXpy_Okn3WEsPjQKZmcbiOGYCfWYNC6_M42GBn5";
const KEY_EN_CRM =
  "tMB0fTRX_ej-ZsQRllq-LuP_FVOBq5GlEcv79omXh60IVTAPsh22SYtj2R7Dm24RZAVd0J";

export async function POST(req: Request): Promise<void | Response> {
  const { lang, timestamp }: { lang: Locale; timestamp: number } =
    await req.json();
  // console.log({ body });
  // const selectedAPI = lang === "uk" ? KEY_UKR_CRM : KEY_EN_CRM;
  const selectedAPI = KEY_UKR_CRM;

  // const { searchParams } = req.nextUrl;
  // console.log("calling post get-price", searchParams);
  try {
    const { data: xmlData } = await axios.get(
      `https://emmyandlily.salesdrive.me/export/yml/export.yml?publicKey=${selectedAPI}&timestamp=${Date.now()}`,
      { responseType: "text" }
    );
    const parsedData = await parseXml(xmlData);
    const products = extractProducts(parsedData);
    const currencies = extractCurrencies(parsedData);

    return NextResponse.json({ products, currencies });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

async function parseXml(xmlData: string): Promise<any> {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (err, result) => {
      if (err) {
        console.error("Error parsing XML:", err);
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function extractProducts(xmlData: any) {
  const shopNode = xmlData.yml_catalog.shop;
  if (
    shopNode &&
    shopNode[0] &&
    shopNode[0].offers &&
    shopNode[0].offers[0] &&
    shopNode[0].offers[0].offer
  ) {
    return shopNode[0].offers[0].offer.map((offer: any) => ({
      id: offer.$.id,
      price: offer.price[0],
      oldprice: offer.oldprice,
      available: offer.$.available,
    }));
  } else {
    console.error("Offers not found in XML data.");
    return [];
  }
}

function extractCurrencies(xmlData: any) {
  const shopNode = xmlData.yml_catalog.shop;
  if (
    shopNode &&
    shopNode[0] &&
    shopNode[0].currencies &&
    shopNode[0].currencies[0] &&
    shopNode[0].currencies[0].currency
  ) {
    return shopNode[0].currencies[0].currency.map((currency: any) => ({
      id: currency.$.id,
      rate: parseFloat(currency.$.rate),
    }));
  } else {
    console.error("Currencies not found in XML data.");
    return [];
  }
}
