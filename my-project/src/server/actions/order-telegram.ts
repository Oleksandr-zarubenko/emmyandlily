"use server";

import { FormPostBody } from "@/types/order";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

function escapeTelegramHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatTelegramValue(value: string | number | boolean | undefined): string {
  if (value === undefined) {
    return "-";
  }

  const normalized = String(value).trim();
  return normalized ? escapeTelegramHtml(normalized) : "-";
}

function buildOrderTelegramMessage(order: FormPostBody): string {
  const products = order.products.length
    ? order.products
        .map((product, index) =>
          [
            `${index + 1}. <b>${formatTelegramValue(product.name)}</b>`,
            `К-сть: ${formatTelegramValue(product.amount)}`,
            `Ціна: ${formatTelegramValue(product.costPerItem)}`,
            `Варіант: ${formatTelegramValue(product.description)}`,
            `Знижка: ${formatTelegramValue(product.discount)}`,
          ].join(" | ")
        )
        .join("\n")
    : "-";

  return [
    "<b>Нове замовлення</b>",
    "",
    `<b>ID</b>: ${formatTelegramValue(order.externalId)}`,
    `<b>Ім'я</b>: ${formatTelegramValue(order.firstName)} ${formatTelegramValue(order.lastName)}`,
    `<b>Email</b>: ${formatTelegramValue(order.email)}`,
    `<b>Телефон</b>: ${formatTelegramValue(order.phoneNumber)}`,
    `<b>Доставка</b>: ${formatTelegramValue(order.selectedOption)}`,
    `<b>Місто</b>: ${formatTelegramValue(order.city)}`,
    `<b>Адреса</b>: ${formatTelegramValue(order.street)}`,
    `<b>Відділення НП</b>: ${formatTelegramValue(order.numnp)}`,
    `<b>Поштомат</b>: ${formatTelegramValue(order.numposhtmat)}`,
    `<b>Індекс</b>: ${formatTelegramValue(order.index)}`,
    `<b>Оплата</b>: ${formatTelegramValue(order.selectePaymentMethod)}`,
    `<b>Промокод</b>: ${formatTelegramValue(order.apiPromocod)}`,
    `<b>Партнерський код</b>: ${formatTelegramValue(order.apiPromocodPartner)}`,
    `<b>Розсилка</b>: ${order.isDiscountsAndNews ? "так" : "ні"}`,
    `<b>Отримувач</b>: ${formatTelegramValue(order.recipientData)}`,
    "",
    "<b>Товари</b>:",
    products,
  ].join("\n");
}

export async function sendTelegramOrderNotification(
  order: FormPostBody
): Promise<{ success: true } | { success: false; error: string }> {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return {
      success: false,
      error: "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is missing",
    };
  }

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: buildOrderTelegramMessage(order),
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: errorText || `Telegram error: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Unknown Telegram request error",
    };
  }
}
