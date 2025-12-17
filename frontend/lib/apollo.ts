import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL =
	process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:4000/graphql";

export const apolloClient = new ApolloClient({
	link: new HttpLink({
		uri: GRAPHQL_URL,
	}),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "cache-and-network",
			errorPolicy: "all",
		},
		query: {
			fetchPolicy: "network-only",
			errorPolicy: "all",
		},
		mutate: {
			errorPolicy: "all",
		},
	},
});
