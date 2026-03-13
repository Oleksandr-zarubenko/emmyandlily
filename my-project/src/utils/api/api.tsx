import { Locale } from "@/i18n/routing";
import { SalesDriveData } from "@/types/salesdrive";
import { getSalesDriveData } from "@/server/actions/salesdrive";

const getData = async (lang: Locale): Promise<SalesDriveData> => {
  try {
    return await getSalesDriveData(lang);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};

export default getData;
