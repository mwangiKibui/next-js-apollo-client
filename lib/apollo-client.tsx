
import {ApolloClient,InMemoryCache} from "@apollo/client";

export const getApolloClient = () => {
    return new ApolloClient({
        uri: 'https://apollo-backend-server-graphql.herokuapp.com',
        cache: new InMemoryCache()
      });
};