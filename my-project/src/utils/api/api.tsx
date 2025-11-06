import { Locale } from "@/i18n/routing";
import axios from "axios";

const getData = async (lang: Locale) => {
  try {
    const res = await axios.post(
      `/api/get-price?timestamp=${Date.now()}`,

      {
        lang,
        timestamp: Date.now(),
      },
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};

export default getData;
