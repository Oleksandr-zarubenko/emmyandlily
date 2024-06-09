import Order from "@/page-components/Order";

import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n.config";
import { Markdown } from "@/components/Markdown";
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
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const query = lang == "ua" ? queryUA : queryEN;
  const { data } = await getClient().query({
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
        <Markdown text={data.policy.policytext} />
      </div>
      <script
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
