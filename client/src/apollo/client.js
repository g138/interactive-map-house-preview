import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
	uri: 'https://glenveagh-api-e6a2avg2cyetexbv.westeurope-01.azurewebsites.net/graphql',
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});

export default client;
