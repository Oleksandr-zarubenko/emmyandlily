// import Order from "@/page-components/Order";

import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import { Markdown } from "@/components/Markdown";
import Script from "next/script";
import { cacheLife, cacheTag } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
const queryEN = gql`
  {
    policy {
      policytext
    }
  }
`;

const queryUA = gql`
  {
    policy(locale: uk) {
      policytext
    }
  }
`;

async function getPolicyData(local: Locale): Promise<{ policy: { policytext: string } }> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:policy:${local}`);

  const query = local === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<{ policy: { policytext: string } }>({
    query,
  });
  if (!data) {
    throw new Error("Failed to load policy data from DatoCMS");
  }
  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const local = lang as Locale;
  const metadataByLocale = {
    uk: {
      title: "Політика конфіденційності | Emmy & Lily",
      description:
        "Дізнайтеся, як Emmy & Lily збирає, зберігає та обробляє персональні дані користувачів сайту.",
    },
    en: {
      title: "Privacy Policy | Emmy & Lily",
      description:
        "Learn how Emmy & Lily collects, stores, and processes personal data when you use the website.",
    },
  } as const;

  return {
    title: metadataByLocale[local].title,
    description: metadataByLocale[local].description,
    alternates: {
      canonical: getCanonicalUrl(local, "/privacy-policy"),
      languages: getLanguageAlternates("/privacy-policy"),
    },
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const local = lang as Locale;
  const data = await getPolicyData(local);

  return (
    <section className="grow py-32">
      <div className="container flex flex-col gap-3">
        <Markdown text={data?.policy.policytext || ""} />
      </div>
      <Script
        id="facebook-pixel-policy-page"
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq('trackCustom', 'PP Page View');
            }
          `,
        }}
      />
    </section>
  );
}
