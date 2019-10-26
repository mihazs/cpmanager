import { GraphQLModule } from '@graphql-modules/core';
import typeDefs from "./schema.graphql";
import { ApolloProjector, IncludeAll, IgnoreField } from 'graphql-db-projection';

export default new GraphQLModule({
    typeDefs,
    schemaDirectives: {
        proj: ApolloProjector,
        all: IncludeAll,
        ignore: IgnoreField
      }
});