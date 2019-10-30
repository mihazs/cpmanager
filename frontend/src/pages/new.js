import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useFormik } from "formik";
import {
  Column,
  Control,
  Field,
  Input,
  Label,
  Section,
  Checkbox,
  Button,
  Help
} from "rbx";
import React from "react";
import { Fade } from "react-reveal";
import { toast } from "react-toastify";
import useRouter from "use-react-router";
import { CPInput } from "../components/formatter";
import { isCPF, isCNPJ } from "brazilian-values";

const ADD_CP = gql`
  mutation AddCp($cp: InsertCadastroPessoaInput!) {
   insert_cadastro_pessoa(input: [$cp]) {
      _id
      blacklisted
      number
    }
  }
`;
export default () => {
  const { history } = useRouter();
  const [addCp] = useMutation(ADD_CP, {
    onCompleted: data => {
      toast.success("Inserido com sucesso");
      history.push("/");
    },
    onError: e => {
      toast.error("Erro interno no servidor");
    }
  });
  const formik = useFormik({
    initialValues: {
      number: "",
      blacklisted: false
    },
    validate: v => {
      const errors = {};
      if (!v.number) {
        errors.number = "Campo obrigatório";
      }
      if (!(isCPF(v.number) || isCNPJ(v.number))) {
        errors.number = "Digite um CPF/CNPJ válido";
      }
      if (v.blacklisted !== true && v.blacklisted !== false) {
        errors.blacklisted = "Campo obrigatório";
      }
      return errors;
    },
    onSubmit: values => {
      addCp({
        variables: {
          cp: {
            number: values.number.replace(/[^\d]/g, ""),
            blacklisted: values.blacklisted
          }
        }
      });
    }
  });
  return (
    <Fade top>
      <Column.Group vcentered centered>
        <Column size="half">
          <Section />
          <Section>
            <form onSubmit={formik.handleSubmit}>
              <Field>
                <Label textColor="white">CPF/CNPJ</Label>
                <Control>
                  <Input
                    as={CPInput}
                    placeholder="Digite um CPF/CNPJ válido"
                    onChange={formik.handleChange}
                    value={formik.values.number}
                    color={formik.errors.number ? "danger" : ""}
                    name="number"
                  />
                </Control>
                {formik.errors.number ? (
                  <Help color="danger">{formik.errors.number}</Help>
                ) : (
                  <></>
                )}
              </Field>
              <Field>
                <Control textColor="white">
                  <Checkbox
                    value={formik.values.blacklisted}
                    onChange={formik.handleChange}
                    color={formik.errors.blacklisted ? "danger" : ""}
                    name="blacklisted"
                  />
                  Blacklist
                </Control>
                {formik.errors.blacklisted ? (
                  <Help color="danger">{formik.errors.blacklisted}</Help>
                ) : (
                  <></>
                )}
              </Field>
              <Field kind="group" align="right">
                <Control>
                  <Button color="success" type="submit">
                    Adicionar
                  </Button>
                </Control>

                <Control>
                  <Button
                    color="danger"
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Cancelar
                  </Button>
                </Control>
              </Field>
            </form>
          </Section>
        </Column>
      </Column.Group>
    </Fade>
  );
};
