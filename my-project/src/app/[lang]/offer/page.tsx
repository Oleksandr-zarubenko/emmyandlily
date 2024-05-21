import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n.config";
import { Markdown } from "@/components/Markdown";
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
        <Markdown text={data.offer.offertext} />
      </div>
    </section>
  );
}
