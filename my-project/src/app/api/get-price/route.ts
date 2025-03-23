import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { parseString } from "xml2js";

export async function POST(req: NextRequest): Promise<void | Response> {
  const { searchParams } = req.nextUrl;
  console.log("calling post get-price", searchParams);
  try {
    const { data: xmlData } = await axios.get(
      `https://emmyandlily.salesdrive.me/export/yml/export.yml?publicKey=JAvWTZJQXYHA15-Adae5O-JRlHOuDA97l1SBWVXpy_Okn3WEsPjQKZmcbiOGYCfWYNC6_M42GBn5&timestamp=${Date.now()}`,
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
