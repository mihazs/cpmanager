import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Section, Title, Column, Loader,Icon } from "rbx";
import React, { useEffect, useState } from "react";
import { Fade } from "react-reveal";
import Datagrid from "../components/datagrid";
import PageLoader from "../components/page-loader";
import useRouter from "use-react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-up";
import styled from "styled-components";
import {ChevronsUp} from "styled-icons/boxicons-regular/ChevronsUp";

const UpIcon = styled(ChevronsUp)`
  height:100%;
  color:#f0f0f0f0;
`;

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
    count: has_more_pages(filter: $filter, pagination: $pagination)
  }
`;

export default () => {
  const { history } = useRouter();
  const [filterQuery, setFilterQuery] = useState({});
  const nextPage = () => {
    const pQuery = {
      size: 10,
      number: Math.ceil(((data ? data.cadastros.length : 10) + 10) / 10.0)
    };
    fetchMore({
      variables: {
        pagination: pQuery,
        filter: filterQuery
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return Object.assign({}, prev, {
          cadastros: [...prev.cadastros, ...fetchMoreResult.cadastros],
          count: fetchMoreResult.count
        });
      }
    });
  };

  const { data, loading, refetch, fetchMore } = useQuery(SELECT_QUERY, {
    variables: { filter: {}, pagination: { size: 10, number: 1 } },
    fetchPolicy: "cache-and-network"
  });
  useEffect(() => {
    refetch();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    fetchMore({
      variables: {
        pagination: {
          size: 10,
          number: 1
        },
        filter: filterQuery
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return { cadastros: [], count: 0 };
        return {
          cadastros: [...fetchMoreResult.cadastros],
          count: fetchMoreResult.count
        };
      }
    });
  }, [filterQuery]);

  return (
    <>
    <ScrollToTop showUnder={160} style={{zIndex: 1000}}>
      <Icon size="medium" backgroundColor="dark">
        <UpIcon/>
      </Icon>
    </ScrollToTop>
    <Fade top>
    
      <Column.Group vcentered centered>
        <Column size="half">
          <Section>
            <Title textColor="white">CPManager</Title>
            <Datagrid
              data={data ? data.cadastros : []}
              hasMore={(data ? data.count : 0) > 0}
              next={nextPage}
              onAddNewClick={() => {
                history.push("/new");
              }}
              onFilterSelect={filter => {
                switch (filter) {
                  case "blacklist":
                    setFilterQuery({ blacklisted: true });
                    break;
                  case "whitelist":
                    setFilterQuery({ blacklisted: false });
                    break;
                  default:
                    setFilterQuery({});
                    break;
                }
              }}
            />
          </Section>
        </Column>
      </Column.Group>
    </Fade>
    </>
  );
};
