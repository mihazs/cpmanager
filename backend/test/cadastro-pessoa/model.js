import {expect} from "chai";
import CadastroPessoa from "../../src/model/cadastro-pessoa";
import mongoose from "mongoose"; 
import {spy} from "sinon";


describe("Models", () =>{
    before(function() {
        for (let model in mongoose.models) delete mongoose.models[model]
      });
    context("CadastroPessoa", ()=>{
        it("deve ser inválido se o cpf for inválido", () =>{
            const m = new CadastroPessoa({number: "90703455098"});
            const callback = spy();
            m.validate(function(e){
                expect(e.errors.number).to.exist;
            });
        });
        it("deve ser inválido se o cpnj for inválido", () =>{
            const m = new CadastroPessoa({number: "35192651000100"});
            const callback = spy();
            m.validate(function(e){
                expect(e.errors.number).to.exist;
            });
        });
        it("deve ser válido se o cpf for válido", () =>{
            const m = new CadastroPessoa({number: "32103177045"});
            const callback = spy();
            m.validate(function(e){
                expect(e).to.not.exist;
            });
        });
        it("deve ser válido se o cpnj for válido", () =>{
            const m = new CadastroPessoa({number: "35192651000105"});
            const callback = spy();
            m.validate(function(e){
                expect(e).to.not.exist;
            });
        });
    });
})