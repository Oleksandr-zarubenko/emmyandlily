import { NextRequest, NextResponse } from "next/server";
import { off } from "process";
import { parseString } from "xml2js";

export async function GET(): Promise<void | Response> {
  try {
    const response = await fetch(
      "https://emmyandlily.salesdrive.me/export/yml/export.yml?publicKey=JAvWTZJQXYHA15-Adae5O-JRlHOuDA97l1SBWVXpy_Okn3WEsPjQKZmcbiOGYCfWYNC6_M42GBn5",
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );
    const xmlData = await response.text();

    const parsedData = await parseXml(xmlData);

    const products = extractProducts(parsedData);
    const currencies = extractCurrencies(parsedData);
    return NextResponse.json({ products, currencies });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.error as any;
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
    const offers = shopNode[0].offers[0].offer;
    const extractedProducts = offers.map((offer: any) => ({
      id: offer.$.id,
      price: offer.price[0],
      oldprice: offer.oldprice,
      available: offer.$.available,
    }));
    return extractedProducts;
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
    const currencies = shopNode[0].currencies[0].currency.map(
      (currency: any) => ({
        id: currency.$.id,
        rate: parseFloat(currency.$.rate),
      })
    );
    return currencies;
  } else {
    console.error("Currencies not found in XML data.");
    return [];
  }
}
