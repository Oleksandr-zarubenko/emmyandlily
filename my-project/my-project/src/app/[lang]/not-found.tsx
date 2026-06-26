import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="container flex grow flex-col items-center justify-center gap-6 py-32 text-center">
      <h1 className="text-t32 font-bold">{t("title")}</h1>
      <p className="text-t18">{t("message")}</p>
      <Link
        href="/"
        className="rounded border-2 border-black px-6 py-3 font-bold"
      >
        {t("homeLink")}
      </Link>
    </div>
  );
}
