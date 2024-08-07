import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const rawBody = await req.json();
  const parsedProducts = rawBody.products.map((product: any) => ({
    id: product.id,
    name: product.name,
    costPerItem: product.costPerItem,
    amount: product.amount,
    description: product.description,
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

  const res = await fetch(`https://emmyandlily.salesdrive.me/handler/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: res.status }
  );
}
