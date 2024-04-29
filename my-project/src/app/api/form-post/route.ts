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
  const res = await fetch(`https://emmyandlily.salesdrive.me/handler/`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      form: "XAbgwAmkIZY5cyOjuJxgGoaJ8jMkYK4yTu0ExeoGSqoUitRJQcFx",
      getResultData: "",
      fName: rawBody.firstName,
      lName: rawBody.lastName,
      email: rawBody.email,
      phone: rawBody.phoneNumber,
      company: "",
      products: parsedProducts,
      payment_method: "",
      shipping_method: rawBody.selectedOption,
      shipping_address: rawBody.street,
      comment: rawBody.recipientData,
      sajt: "",
      promokod: rawBody.apiPromocod,
      externalId: "",
      organizationId: "",
      stockId: "",
      novaposhta: {
        ServiceType: rawBody.selectedOption,
        payer: "",
        area: "",
        region: "",
        city: rawBody.city,
        cityNameFormat: rawBody.numposhtmat,
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
    }),
  });

  return NextResponse.json(
    { error: "Internal Server Error" },
    { status: res.status }
  );
}
