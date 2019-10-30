import { Box, Button, Column, Icon, Tag, Loader } from "rbx";
import React from "react";
import { AddCircle } from "./icons.js";
import { Row } from "./row.js";
import InfiniteScroll from 'react-infinite-scroll-component';



export default ({ data, onActionClick, onAddNewClick, hasMore, next, onFilterSelect}) => {
  return (
    <>
      <Column.Group gapless centered vcentered>
        <Column>
          <Button rounded onClick = {()=>{if(typeof onAddNewClick === "function") onAddNewClick();}}>
            <Icon size="small">
              <AddCircle />
            </Icon>
            <span>Novo</span>
          </Button>
        </Column>
        <Column narrow>
          <Tag.Group gapless>
            <Tag as={Button} onClick= {()=>{
              if(typeof onFilterSelect === "function") onFilterSelect("blacklist");
            }} color="black" size="medium">
              Blacklist
            </Tag>
            <Tag as={Button} onClick= {()=>{
              if(typeof onFilterSelect === "function") onFilterSelect("whitelist");
            }} color="white" size="medium">
              Whitelist
            </Tag>
          </Tag.Group>
        </Column>
      </Column.Group>
      <InfiniteScroll dataLength = {(data ? data : []).length} loader ={<Loader/>} hasMore={hasMore} next = {next} scrollableTarget={window} style={{overflow:"hidden"}}>
      <Column.Group multiline as={Box} style={{overflow:"hidden"}}>
      {data.length > 0 ? (
          data.map((element, i) => (
            <Row data={element} key={i} divider={data.length - 1 > i} onActionClick />
          ))
        ) : (
          <p>Sem registros para exibir.</p>
        )}
        </Column.Group>
          </InfiniteScroll>

    </>
  );
};



