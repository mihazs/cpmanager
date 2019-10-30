import { Column, Control, Field, Generic, Icon, Input } from "rbx";
import React, { useState } from "react";
import { OuterClick } from "react-outer-click";
import styled from "styled-components";
import { CPFormat, CPInput } from "../formatter";
import {
  Blacklist,
  Cancel,
  CheckIcon as Check,
  Pencil,
  Trash,
  Whitelist
} from "./icons.js";

export const Row = ({ data, key, divider = true, onActionClick }) => {
  //estado usado para lidar com o click na row, quando ele é verdadeiro, mostra as actions disponíveis
  const [toggleClick, setToggleClick] = useState(false);
  //estado que  coloca a row no modo de edição
  const [editMode, setEditMode] = useState(false);
  //função usada para alterar o tamanho da coluna de actions
  const size = toggle => (toggle ? 5 : 0);
  //lida com o clique em uma action e verifica se o onActionClick é uma função
  const handleActionClick = ({ action, data }) => {
    //se onActionClick é uma função, executa o onActionClick
    if (typeof onActionClick === "function") onActionClick({ action, data });
    //esconde as actions
    setToggleClick(false);
  };
  return (
    <>
      <Column
        key={key}
        size="full"
        textAlign="centered"
        style={{ height: "100%" }}
      >
        <OuterClick
          onOuterClick={() => {
            setToggleClick(false);
          }}
        >
          <Column.Group centered vcentered style={{ height: "100%" }}>
            <RowBody
              onClick={() => {
                setToggleClick(!toggleClick && !editMode);
              }}
            >
              {!editMode ? (
                <a href="#">
                  <CPFormat text={data.number} />
                </a>
              ) : (
                <Field >
                  <Control>
                    <Input as={CPInput} size="large" valid={b => {}} value={data.number} />
                  </Control>
                </Field>
              )}
            </RowBody>
            <TransitionColumn size={size(toggleClick || editMode)}>
              <Column.Group>
                {editMode ? (
                  <>
                    <ActionIcon
                      color="#10ac84"
                      hide={!editMode}
                      title="Enviar"
                      textColor="white"
                      onClick={() => {
                        handleActionClick({ action: "edit", data });
                        setEditMode(false);
                      }}
                    >
                      <Check />
                    </ActionIcon>
                    <ActionIcon
                      color="#ee5253"
                      hide={!editMode}
                      title="Cancelar"
                      textColor="white"
                      onClick={() => {
                        setEditMode(false);
                        setToggleClick(true);
                      }}
                    >
                      <Cancel />
                    </ActionIcon>
                  </>
                ) : (
                  <>
                    <ActionIcon
                      color="#0984e3"
                      hide={!toggleClick}
                      title="Editar"
                      onClick={() => {
                        setEditMode(true);
                        setToggleClick(false);
                      }}
                    >
                      <Pencil />
                    </ActionIcon>
                    <ActionIcon
                      color="#d63031"
                      hide={!toggleClick}
                      title="Excluir"
                      onClick={() => {
                        handleActionClick({ action: "excluir", data });
                      }}
                    >
                      <Trash />
                    </ActionIcon>
                    {data.blacklisted ? (
                      <ActionIcon
                        color="#dfe6e9"
                        hide={!toggleClick}
                        title="Whitelist"
                        textColor="dark"
                        onClick={() => {
                          handleActionClick({ action: "whitelist", data });
                        }}
                      >
                        <Whitelist />
                      </ActionIcon>
                    ) : (
                      <ActionIcon
                        color="#000"
                        hide={!toggleClick}
                        title="Blacklist"
                        onClick={() => {
                          handleActionClick({ action: "blacklist", data });
                        }}
                      >
                        <Blacklist />
                      </ActionIcon>
                    )}
                  </>
                )}
              </Column.Group>
            </TransitionColumn>
          </Column.Group>
        </OuterClick>
      </Column>
      {divider ? <Line /> : <></>}
    </>
  );
};

const _ActionIcon = ({
  title,
  hide,
  color,
  children,
  textColor,
  onClick,
  size
}) => (
  <ActionIconBody background={color} hide={hide} onClick={onClick} size={size}>
    <a href="#">
      <Icon size="medium" style={{ width: "100%" }}>
        {children}
      </Icon>
      <Generic as="span" textColor={textColor || "white"}>
        {title}
      </Generic>
    </a>
  </ActionIconBody>
);
const ActionIcon = styled(_ActionIcon)`
  transition: all 2s;
`;
const Line = styled.div`
  width: 100%;
  border-bottom: solid 1pt rgba(0, 0, 0, 0.08);
`;

const RowBody = styled(Column)`
  font-size: 2em;
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  a {
    color: #000 !important;
  }
`;

const ActionIconBody = styled(Column)`
  background-color: ${({ background = "#000" }) => background};
  opacity: ${({ hide = true }) => (hide ? 0 : 1)};
  height: ${({ hide = true }) => (hide ? 0 : "auto")};
  
`;
const TransitionColumn = styled(Column)`
  transition: width 0.5s;
`;
