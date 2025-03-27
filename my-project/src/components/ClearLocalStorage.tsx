"use client";
import { useEffect, useState } from "react";
import { Markdown } from "@/components/Markdown"; // Ensure you import the Markdown component

export function ClearLocalStorage({
  additionalText,
}: {
  additionalText: string;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null); // Track success or failure

  useEffect(() => {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("email");

      if (email) {
        setLoading(true); // Start loading before sending the email
        sendEmail(email);
      }
    }
  }, []);

  const sendEmail = async (email: string) => {
    try {
      const storedData = localStorage.getItem("storedData");
      const products = storedData ? JSON.parse(storedData) : [];

      const productList = products
        .map(
          (item: { productName: string; price: string }) =>
            `- ${item.productName}: ${item.price} грн`
        )
        .join("\n");

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Emmy&Lily Замовлення",
          message: `Ваше замовлення було прийняте! 🛍️\n\n📦 Список товарів:\n${productList}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true); // Success, show the additional text
        setStatus("✅ Email sent successfully!");
      } else {
        setIsSuccess(false); // Failure, show the error message
        setStatus("❌ Failed to send email: " + result.error);
      }
    } catch (error) {
      setIsSuccess(false); // Failure, show the error message
      setStatus("❌ Error: " + (error as Error).message);
    } finally {
      localStorage.clear(); // Clear local storage after email is sent or error occurs
      setLoading(false); // Stop loading once the process is finished
    }
  };

  return (
    <div className="flex w-full items-center justify-center">
      {loading ? (
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-black"></div> // Centered loader
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
