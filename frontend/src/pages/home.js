import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Section, Title, Column, Loader } from "rbx";
import React, {useEffect, useState} from "react";
import { Fade } from "react-reveal";
import Datagrid from "../components/datagrid";
import PageLoader from "../components/page-loader";
import useRouter from "use-react-router";
import InfiniteScroll from 'react-infinite-scroll-component';


const SELECT_QUERY = gql`
  query SelectCadastroPessoa(
    $filter: SelectCadastroPessoaInput
    $pagination: Pagination,
  ) {
    cadastros: select_cadastro_pessoa(
      filter: $filter
      pagination: $pagination
    ) {
      _id
      blacklisted
      number
    }
    count: has_more_pages(filter: $filter
      pagination: $pagination)
  }
`;

export default () => {

  const {history} = useRouter();
  const [filterQuery, setFilterQuery] = useState({})
  const [paginationQuery, setPaginationQuery] = useState({ size: 10, number: 1 })
  const nextPage = ()=>{
    const pQuery = {size: 10, number: (Math.ceil(((data ? data.cadastros.length : 10) + 10)/10.0))};
    
    fetchMore({
      variables: {
        pagination: {size: 10, number: (Math.ceil(((data ? data.cadastros.length : 10) + 10)/10.0))},
        filter: {}
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) return prev;
      return Object.assign({}, prev, {
        cadastros: [...prev.cadastros, ...fetchMoreResult.cadastros],
        count:fetchMoreResult.count
      });
      }
    })
  };

  const { data, loading, refetch, fetchMore } = useQuery(SELECT_QUERY, {
    variables: { filter: {}, pagination: { size: 10, number: 1 } },
    fetchPolicy: "cache-and-network",

  });
  useEffect(()=>{
    refetch();
    // eslint-disable-next-line
  },[]);

  return (
    <Fade top>

        <Column.Group vcentered centered>
    <Column size="half">
    <Section/>
      <Section>
      <Datagrid data={data ? data.cadastros : []} hasMore={(data ? data.count : 0) > 0} next={nextPage}
          onAddNewClick={()=>{
            history.push("/new");
          }}
          onFilterSelect={(filter)=>{
            switch(filter){
              case "blacklist":
                break;
              case "whitelist":
                break;

            }
          }}/>
      
      </Section>
    </Column>
  </Column.Group>

    </Fade>
  );
};
