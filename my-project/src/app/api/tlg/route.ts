import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
  const data = await req.json();
  try {
    const messageToBot = `
<b>fullName</b>: ${data?.fullName} %0A
<b>telegram or instagram</b>: ${data?.email} %0A
<b>phone</b>: ${data?.phone} %0A
<b>mail</b>: ${data?.message} %0A
<b>Created At</b>: ${data?.createdAt}
    `;
    const id = "-1001852124342";
    const ret = await fetch(
      `https://api.telegram.org/bot${tgbot}/sendMessage?chat_id=${id}&text=${messageToBot}&parse_mode=HTML`
    );

    const botResponse = await ret.text();

    return NextResponse.json({ data: botResponse });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
