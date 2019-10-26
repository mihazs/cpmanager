import { ApolloServer } from 'apollo-server';
import Modules from  './modules';
import log from 'console-emoji';


//Constrói um apollo server baseado nos graphql modules passados
const server = new ApolloServer({
    //Módulos do servidor apollo
  modules: [Modules],
  //Contexto, nesse caso usado para armazenar a session
  context: session => session,
  playground: (process.env.NODE_ENV === "developement")
});

//Dá início ao servidor
server.listen(4000, () =>{
    log("Servidor rodando na porta 4000 :rocket:"); //Emojis, por que não??
});