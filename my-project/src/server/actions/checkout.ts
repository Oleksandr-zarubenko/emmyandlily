"use server";

import nodemailer from "nodemailer";
import { Locale } from "@/i18n/routing";
import { FormPostBody } from "@/types/order";

type MonoInvoiceInput = {
  amount: number;
  numberValute: 978 | 980;
  externalId: string;
  productNamesString: string;
  lang: Locale;
};

const MONO_TOKEN = process.env.MONO_MERCHANT_TOKEN;

export async function submitOrderToSalesDrive(
  rawBody: FormPostBody
): Promise<void> {
  const parsedProducts = rawBody.products.map((product) => ({
    id: product.id,
    name: product.name,
    costPerItem: product.costPerItem,
    amount: product.amount,
    description: product.description,
    discount: product.discount,
  }));

  const requestBody = {
    form: "XAbgwAmkIZY5cyOjuJxgGoaJ8jMkYK4yTu0ExeoGSqoUitRJQcFx",
    getResultData: "",
    con_conzgodaNaOtrimannaPromoMaterialiv: rawBody.isDiscountsAndNews,
    fName: rawBody.firstName,
    lName: rawBody.lastName,
    email: rawBody.email,
    phone: rawBody.phoneNumber,
    company: "",
    products: parsedProducts,
    payment_method: rawBody.selectePaymentMethod,
    shipping_method: rawBody.selectedOption,
    shipping_address: rawBody.street,
    comment: rawBody.recipientData,
    sajt: "Site",
    promokod: rawBody.apiPromocod,
    partnerPoPromokodu: rawBody.apiPromocodPartner,
    externalId: rawBody.externalId,
    organizationId: "",
    stockId: "",
    novaposhta: {
      ServiceType: rawBody.selectedOption,
      payer: "",
      area: "",
      region: "",
      city: rawBody.city,
      cityNameFormat: "",
      WarehouseNumber: rawBody.numnp,
      Street: rawBody.street,
      BuildingNumber: rawBody.houseNumber,
      Flat: "",
    },
    ukrposhta: {
      ServiceType: "",
      payer: "",
      type: "",
      city: rawBody.city,
      WarehouseNumber: rawBody.index,
      Street: rawBody.index,
      BuildingNumber: "",
      Flat: "",
    },
    prodex24source_full: "",
    prodex24source: "",
    prodex24medium: "",
    prodex24campaign: "",
    prodex24content: "",
    prodex24term: "",
    prodex24page: "",
  };

  const res = await fetch("https://emmyandlily.salesdrive.me/handler/", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  console.log(res);

  if (!res.ok) {
    throw new Error(`SalesDrive error: ${res.status}`);
  }
}

export async function createMonobankInvoice(
  input: MonoInvoiceInput
): Promise<{ pageUrl: string }> {
  if (!MONO_TOKEN) {
    throw new Error("MONO_MERCHANT_TOKEN is missing");
  }

  const response = await fetch(
    "https://api.monobank.ua/api/merchant/invoice/create",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token": MONO_TOKEN,
      },
      body: JSON.stringify({
        amount: input.amount,
        ccy: input.numberValute,
        merchantPaymInfo: {
          reference: input.externalId,
          destination: input.productNamesString,
          comment: input.productNamesString,
          customerEmails: [],
        },
        redirectUrl: `http://emmyandlily.com/${input.lang}/thank-you`,
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
    throw new Error(text || "Failed to create invoice");
  }

  const respJson = (await response.json()) as { pageUrl: string };
  return { pageUrl: respJson.pageUrl };
}

export async function sendOrderEmail(input: {
  to: string;
  subject: string;
  message: string;
}): Promise<
  { success: true; messageId: string } | { success: false; error: string }
> {
  if (!input.to || !input.subject || !input.message) {
    return { success: false, error: "Missing fields" };
  }
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return { success: false, error: "Email credentials missing" };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Emmy&Lili" <${process.env.EMAIL_USER}>`,
      to: input.to,
      subject: input.subject,
      text: input.message,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown mail error",
    };
  }
}
