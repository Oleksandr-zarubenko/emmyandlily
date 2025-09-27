// import { HttpLink } from "@apollo/client";
// import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
// import {
//   NextSSRApolloClient,
//   NextSSRInMemoryCache,
// } from "@apollo/experimental-nextjs-app-support/ssr";
// export const { getClient } = registerApolloClient(() => {
//   return new NextSSRApolloClient({
//     cache: new NextSSRInMemoryCache(),
//     link: new HttpLink({
//       uri: "https://graphql.datocms.com/",
//       headers: {
//         Authorization: `Bearer ${process.env.DATO_TOKEN}`,
//       },
//     }),
//   });
// });
import { HttpLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://graphql.datocms.com/",
      headers: {
        Authorization: `Bearer ${process.env.DATO_TOKEN}`,
      },
    }),
  });
});
