import { GraphQLModule } from '@graphql-modules/core';

import CadastroPessoaModule from "./cadastro-pessoa";
import directives from "./directives";
export default new GraphQLModule({
    imports: [directives, CadastroPessoaModule]
});