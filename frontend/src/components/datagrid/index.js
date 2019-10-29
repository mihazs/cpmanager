import { Box, Column } from "rbx";
import React, {useState} from "react";
import styled from "styled-components";
import {TrashAlt} from "styled-icons/fa-solid/TrashAlt";

const Trash = styled(TrashAlt)`
  color: rgba(255, 255, 255, 0.5);


`;

const Line = styled.div`
  width: 100%;
  border-bottom: solid 0.6px rgba(0, 0, 0, 0.2);
`;
const RowBody = styled(Column)`
  font-size: 2.75em;
  
`;
const ActionIcon = styled(Column)`
  background-color: ${({background = "#000"}) => background};
  opacity: ${({hide = true}) => hide ? 0 : 1};
  transition: all 0.2s;
  
  
`;

const Row = ({ data, key, divider = true }) => {
  const [toggleClick, setToggleClick] = useState(false);
  const size = (toggle) => toggle ? 2 : 0;
  return (
    <>
      <Column key={key} size="full" textAlign="centered" style={{height: "100%"}} >
        <Column.Group centered vcentered style={{height: "100%"}}>
          <RowBody onClick = {() => {setToggleClick(!toggleClick)}}>{data.number}</RowBody>
          <ActionIcon background ="#fd79a8"  hide = {!toggleClick} size = {size(toggleClick)}><Trash/></ActionIcon>
        </Column.Group>
      </Column>
      {divider ? <Line /> : <></>}
    </>
  );
};

export default ({ data }) => (
  <Column.Group vcentered centered>
    <Column size="one-quarter">
      <Column.Group multiline as={Box}>
        {data.map((element, i) => (
          <Row data={element} key={i} divider={data.length - 1 > i} />
        ))}
      </Column.Group>
    </Column>
  </Column.Group>
);
