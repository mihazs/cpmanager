import {Schema, model} from "mongoose";
import {cnpj, cpf} from "cpf-cnpj-validator";

const cadastroPessoaSchema = new Schema({
    number:{
        type: String,
        validate:{
            validator: (v) =>{
                return cnpj.isValid(v) || cpf.isValid(v);
            },
            message: props => `${props.value} não é um cpf ou cpj válido`          
        },
        required: [true, "CPF/CNPJ obrigatório"]
    },
    blacklisted:{
        type: Boolean,
        default: false
    }
});
export default model("CadastroPessoa", cadastroPessoaSchema);