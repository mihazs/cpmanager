import {expect} from "chai";
import {execute} from "graphql";
import {spy} from "sinon";
import AppModule from "../../src/modules";
import mongoose from "mongoose";
import makeProjection, {toMongoProjection} from 'graphql-db-projection';
import gql from "graphql-tag";
import { rejects } from "assert";


describe("GraphQL", function(){
    before(function() {
      
        for (let model in mongoose.models) delete mongoose.models[model]
      });
    context("CadastroPessoa", async function(done){
        beforeEach(function(){
            AppModule.resetMock();
          });
        it('deve ser válido se o select for válido', async function(done) {
          

            const data = [{ _id: 1, number: "42026542007", blacklisted: false},
            { _id: 2, number: "42049802013", blacklisted: true}];
            const {schema} = AppModule.mock({
                resolvers: {
                   Query: {
                       select_cadastro_pessoa: (root, {filter, pagination}, _, fieldASTs) =>{
                           expect(makeProjection(fieldASTs), "projeção inválida").to.be.equal(["number", "blacklisted"]);
                           expect(filter).to.include.keys("_id");
                           return data.filter((e) => e._id == filter._id);
                       }
                       
                   }
                }
            });
             expect(schema,  "schema não gerado").to.exist;
             try{
            const result = await execute({
                schema,
                document: gql`
                  query {
                    select_cadastro_pessoa(_id: 1) {
                     number,
                     blacklisted
                    }
                  }
                `,
              });
                expect(result.errors).to.be.false;
                expect(result.data["select_cadastro_pessoa"]["blacklisted"]).to.be.equal(false);
                expect(result.data["select_cadastro_pessoa"]["number"]).to.be.equal("42026542007");
                done();
            } catch(error){
              done(error);
            }
                
              
              
              

        });
    });
});