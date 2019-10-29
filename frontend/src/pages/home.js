import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Section } from "rbx";
import React from "react";
import { Fade } from "react-reveal";
import Datagrid from "../components/datagrid";
import PageLoader from "../components/page-loader";

const SELECT_QUERY = gql`
  query SelectCadastroPessoa(
    $filter: SelectCadastroPessoaInput
    $pagination: Pagination
  ) {
    cadastros: select_cadastro_pessoa(
      filter: $filter
      pagination: $pagination
    ) {
      _id
      blacklisted
      number
    }
  }
`;


export default () => {
  const { data, loading } = useQuery(SELECT_QUERY, {
    variables: { filter: {}, pagination: { size: 5, number: 1 } }
  });
  if (loading) {
    return <PageLoader />;
  }
  return (
    <Fade top>
      <Section>
        <Datagrid data={data.cadastros}/>
      </Section>
    </Fade>
  );
};
