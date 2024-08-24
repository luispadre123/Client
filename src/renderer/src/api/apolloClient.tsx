import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const createApolloClient = (token: string | null) => {
    const httpLink = new HttpLink({
        uri: 'http://localhost:9090/graphql',
    });

    const wsLink = new GraphQLWsLink(createClient({
        url: 'ws://localhost:9090/graphql',
        options: {
            reconnect: true,
            connectionParams: {
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            },
        },
    }));

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink
    );

    return new ApolloClient({
        link: splitLink,
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
