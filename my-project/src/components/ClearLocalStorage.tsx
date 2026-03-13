"use client";
import { useEffect, useRef, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { useCheckoutStore } from "@/store/checkoutStore";
import { sendOrderEmail } from "@/server/actions/checkout";

export function ClearLocalStorage({
  additionalText,
}: {
  additionalText: string;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const hasSentRef = useRef(false);

  const email = useCheckoutStore((store) => store.email);
  const cartItems = useCheckoutStore((store) => store.cartItems);
  const resetCheckout = useCheckoutStore((store) => store.resetCheckout);

  useEffect(() => {
    if (hasSentRef.current) {
      return;
    }

    if (!email) {
      setIsSuccess(false);
      setStatus("❌ Email is missing");
      return;
    }

    hasSentRef.current = true;
    setLoading(true);

    const sendEmail = async () => {
      try {
        const productList = cartItems
          .map((item) => `- ${item.productName}: ${item.price} грн`)
          .join("\n");

        const result = await sendOrderEmail({
          to: email,
          subject: "Emmy&Lily Замовлення",
          message: `Ваше замовлення було прийняте! 🛍️\n\n📦 Список товарів:\n${productList}`,
        });

        if (result.success) {
          setIsSuccess(true);
          setStatus("✅ Email sent successfully!");
        } else {
          setIsSuccess(false);
          setStatus("❌ Failed to send email: " + (result.error || "unknown error"));
        }
      } catch (error) {
        setIsSuccess(false);
        setStatus("❌ Error: " + (error as Error).message);
      } finally {
        resetCheckout();
        setLoading(false);
      }
    };

    sendEmail();
  }, [email, cartItems, resetCheckout]);

  return (
    <div className="flex w-full items-center justify-center">
      {loading ? (
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-black"></div>
      ) : isSuccess ? (
        <div className="flex flex-col items-center">
          <Markdown text={additionalText} className="smOnly:mb-44" />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}
