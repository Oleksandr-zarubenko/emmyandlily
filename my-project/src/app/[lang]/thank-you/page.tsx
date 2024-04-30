import { gql } from "@apollo/client";
import { getClient } from "@/utils/apollo-client";
import { Locale } from "@/i18n.config";
import { Markdown } from "@/components/Markdown";
import cn from "classnames";
import Link from "next/link";

const queryEN = gql`
  {
    thankyoupage {
      additionaltext
      buttontext
      maintext
    }
  }
`;

const queryUA = gql`
  {
    thankyoupage(locale: uk) {
      additionaltext
      buttontext
      maintext
    }
  }
`;
export default async function ThankYouPage({
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
  console.log(data);

  return (
    <section className="grow py-32">
      <div className="container flex flex-col gap-3">
        <Markdown text={data.thankyoupage.maintext} />
        <Markdown text={data.thankyoupage.additionaltext} />
        <Link
          href={lang == "ua" ? "/ua" : "/"}
          className="relative z-20 max-w-max rounded bg-black px-6 py-3 text-center text-t18 font-bold text-white duration-300 hover:bg-white hover:text-black hover:ring-1 hover:ring-black"
        >
          {data.thankyoupage.buttontext}
        </Link>
      </div>
    </section>
  );
}
