import { NextResponse } from "next/server";

const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function POST(req: Request) {
  const tgbot = process.env.NEXT_TELEGRAM_TOKEN;
  const chatId = "-1001852124342";

  if (!tgbot) {
    console.error("NEXT_TELEGRAM_TOKEN is missing");
    return NextResponse.json({ message: "Something went wrong" });
  }

  const data = await req.json();
  try {
    const messageToBot = [
      `<b>fullName</b>: ${escapeHtml(data?.fullName)}`,
      `<b>telegram or instagram</b>: ${escapeHtml(data?.email)}`,
      `<b>phone</b>: ${escapeHtml(data?.phone)}`,
      `<b>mail</b>: ${escapeHtml(data?.message)}`,
      `<b>Created At</b>: ${escapeHtml(data?.createdAt)}`,
    ].join("\n");

    const ret = await fetch(
      `https://api.telegram.org/bot${tgbot}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageToBot,
          parse_mode: "HTML",
        }),
      }
    );

    const botResponse = await ret.text();

    return NextResponse.json({ data: botResponse });
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json({ message: "Something went wrong" });
  }
}
