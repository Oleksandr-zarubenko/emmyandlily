import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Markdown } from "@/components/Markdown";
import { Locale } from "@/i18n/routing";
const queryEN = gql`
  {
    offer {
      offertext
    }
  }
`;

const queryUA = gql`
  {
    offer(locale: uk) {
      offertext
    }
  }
`;
export default async function OfferPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const query = lang == "uk" ? queryUA : queryEN;
  const { data } = await getClient().query<{ offer: { offertext: string } }>({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  return (
    <>
      <section className="grow py-32">
        <div className="container flex flex-col gap-3">
          <Markdown text={data?.offer.offertext || "offer"} />
        </div>
      </section>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== "undefined" && window.fbq) {
              window.fbq('track', 'Offer Page View');
            }
          `,
        }}
      />
    </>
  );
}
