import { GraphQLModule } from '@graphql-modules/core';
import gql from 'graphql-tag';
import typeDefs from "./schema.graphql";
import directives from "../directives";
import CadastroPessoa from "../../model/cadastro-pessoa";
import mongoose from "mongoose";
import makeProjection, {toMongoProjection} from 'graphql-db-projection';

const resolvers = {
    Query: {
        select_cadastro_pessoa: (root, {filter, pagination}, _, fieldASTs) =>{
            //Cria a query para filtrar e localizar
            var query = CadastroPessoa.find(filter || {}, toMongoProjection(makeProjection(fieldASTs)));
            if(pagination){
                query = query.skip(pagination.size*(pagination.number-1)).limit(pagination.size);
            }
            return query.exec();
        },
        has_more_pages: (root, {filter, pagination}, _, fieldASTs) =>{
            //Cria a query para filtrar e localizar
            var query = CadastroPessoa.find(filter || {}, toMongoProjection(makeProjection(fieldASTs)));
            if(pagination){
                query = query.skip(pagination.size*(pagination.number)).limit(pagination.size).countDocuments();
            }
            return query.exec();
        },          
    },
    Mutation: {
        insert_cadastro_pessoa: (root, {input}, _, fieldASTs) => CadastroPessoa.insertMany(input),
        update_cadastro_pessoa: (root, {input, filter}, _, fieldASTs) => CadastroPessoa.updateMany(filter, input).exec(),
        delete_cadastro_pessoa: (root, {filter}, _, fieldASTs) => CadastroPessoa.deleteMany(filter).exec(),
    }
}

export default new GraphQLModule({ 
    typeDefs,
    resolvers,
    imports: [directives]
});