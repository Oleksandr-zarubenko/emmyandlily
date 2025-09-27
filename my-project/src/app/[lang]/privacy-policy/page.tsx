// import Order from "@/page-components/Order";

import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n/routing";
import { Markdown } from "@/components/Markdown";
import Script from "next/script";
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
export default async function PolicyPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const query = lang == "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<{ policy: { policytext: string } }>({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

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
              window.fbq('track', 'PP Page View');
            }
          `,
        }}
      />
    </section>
  );
}
