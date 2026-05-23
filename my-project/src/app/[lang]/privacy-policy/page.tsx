import { gql, type TypedDocumentNode } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import { Markdown } from "@/components/Markdown";
import { cacheLife, cacheTag } from "next/cache";
import { Metadata } from "next";
import { getCanonicalUrl, getLanguageAlternates } from "@/utils/seo";
import { PixelPageView } from "@/components/PixelPageView";
import { StructuredData } from "@/components/StructuredData";
import { createContentPageSchema } from "@/utils/schema";

const policyMetadataByLocale = {
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

type PolicyData = {
  policy: {
    policytext: string;
  };
};

const queryEN = gql`
  {
    policy {
      policytext
    }
  }
` as TypedDocumentNode<PolicyData>;

const queryUA = gql`
  {
    policy(locale: uk) {
      policytext
    }
  }
` as TypedDocumentNode<PolicyData>;

async function getPolicyData(local: Locale): Promise<PolicyData> {
  "use cache";
  cacheLife("minutes");
  cacheTag(`dato:policy:${local}`);

  const query = local === "uk" ? queryUA : queryEN;
  const { data } = await getClient().query({
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

  return {
    title: policyMetadataByLocale[local].title,
    description: policyMetadataByLocale[local].description,
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
  const meta = policyMetadataByLocale[local];
  const headingByLocale = {
    uk: "Політика конфіденційності",
    en: "Privacy Policy",
  } as const;

  return (
    <>
      <StructuredData
        id="privacy-policy-schema"
        schema={createContentPageSchema({
          lang: local,
          path: "/privacy-policy",
          title: meta.title,
          description: meta.description,
        })}
      />
      <section className="grow py-32">
        <div className="container flex flex-col gap-3">
          <h1 className="text-t32 mb-8 font-bold tracking-wider">
            {headingByLocale[local]}
          </h1>
          <Markdown text={data?.policy.policytext || ""} />
        </div>
        <PixelPageView eventName="PrivacyPolicyPageView" />
      </section>
    </>
  );
}
