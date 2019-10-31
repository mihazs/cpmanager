import { Box, Button, Column, Icon, Tag, Loader, Delete } from "rbx";
import React, { useState } from "react";
import { AddCircle } from "./icons.js";
import { Row } from "./row.js";
import InfiniteScroll from "react-infinite-scroll-component";

export default ({
  data,
  onActionClick,
  onAddNewClick,
  hasMore,
  next,
  onFilterSelect
}) => {
  const [blacklistFilter, setBlacklistFilter] = useState(false);
  const changeFilter = filter => {
    if (typeof onFilterSelect === "function") onFilterSelect(filter);
    setBlacklistFilter(filter);
  };
  const toggleFilter = filter => {
    if (blacklistFilter === filter) {
      changeFilter("");
    } else {
      changeFilter(filter);
    }
  };

  return (
    <>
      <Column.Group gapless centered vcentered>
        <Column>
          <Button
            rounded
            onClick={() => {
              if (typeof onAddNewClick === "function") onAddNewClick();
            }}
          >
            <Icon size="small">
              <AddCircle />
            </Icon>
            <span>Novo</span>
          </Button>
        </Column>
        <Column narrow>
          <Tag.Group gapless>
            <Tag
              as={Button}
              hidden={blacklistFilter === "whitelist"}
              onClick={() => {
                toggleFilter("blacklist");
              }}
              color="black"
              size="medium"
            >
              Blacklist
              {blacklistFilter === "blacklist" ? (
                <Delete size="medium" />
              ) : (
                <></>
              )}
            </Tag>
            <Tag
              as={Button}
              hidden={blacklistFilter === "blacklist"}
              onClick={() => {
                toggleFilter("whitelist");
              }}
              color="white"
              size="medium"
            >
              Whitelist
              {blacklistFilter === "whitelist" ? (
                <Delete size="medium" />
              ) : (
                <></>
              )}
            </Tag>
          </Tag.Group>
        </Column>
      </Column.Group>

      <Box as={InfiniteScroll}
        dataLength={(data ? data : []).length}
        loader={<Loader />}
        hasMore={hasMore}
        next={next}
        scrollableTarget={window}
        style={{ overflow: "hidden" }}
      >
        <Column.Group multiline style={{ overflow: "hidden" }}>
       
          {data.length > 0 ? (
            data.map((element, i) => (
              <Row
                data={element}
                key={i}
                divider={data.length - 1 > i}
                onActionClick
                style={{ overflow: "hidden" }}
              />
            ))
          ) : (
            <p>Sem registros para exibir.</p>
          )}
        </Column.Group>
      </Box>
    </>
  );
};
