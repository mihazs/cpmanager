import { ApolloServer } from 'apollo-server';
import Modules from  './modules';
import log from 'console-emoji';
import {connect} from "mongoose";

//Connect to mongodb
connect(process.env.MONGODB_URI, {useNewUrlParser: true});
//Constrói um apollo server baseado nos graphql modules passados
const server = new ApolloServer({
    //Módulos do servidor apollo
  modules: [Modules],
  //Contexto, nesse caso usado para armazenar a session
  context: session => session,
  playground: true,
  introspection: true
});

//Dá início ao servidor
server.listen(5000, () =>{
    log(`Servidor rodando na porta 5000 :rocket:`); //Emojis, por que não??
});