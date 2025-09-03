import { NextRequest, NextResponse } from "next/server";
type RequestType = {
  amount: number;
  numberValute: 978 | 980;
  externalId: string;
  productNamesString: any;
  lang: any;
};
const MONO_TOKEN = process.env.MONO_MERCHANT_TOKEN!;

export async function POST(req: NextRequest) {
  const {
    amount,
    numberValute,
    externalId,
    productNamesString,
    lang,
  }: RequestType = await req.json();

  try {
    const response = await fetch(
      "https://api.monobank.ua/api/merchant/invoice/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token": MONO_TOKEN,
        },
        body: JSON.stringify({
          amount: amount,
          ccy: numberValute,
          merchantPaymInfo: {
            reference: externalId,
            destination: productNamesString,
            comment: productNamesString,
            customerEmails: [],
          },
          redirectUrl: `http://emmyandlily.com/${lang}/thank-you`,
          webHookUrl:
            "https://example.com/mono/acquiring/webhook/maybesomegibberishuniquestringbutnotnecessarily",
          validity: 3600,
          paymentType: "debit",
          saveCardData: {
            saveCard: true,
            walletId: "69f780d841a0434aa535b08821f4822c",
          },
        }),
      }
    );
    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: text }, { status: 502 });
    }
    const respJson = await response.json();
    return NextResponse.json({
      pageUrl: respJson.pageUrl,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
