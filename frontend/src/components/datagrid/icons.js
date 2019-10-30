import styled from "styled-components";
import { Check } from "styled-icons/boxicons-regular/Check";
import { ListMinus } from "styled-icons/boxicons-regular/ListMinus";
import { ListPlus } from "styled-icons/boxicons-regular/ListPlus";
import { TrashAlt } from "styled-icons/fa-solid/TrashAlt";
import { Pencil2 } from "styled-icons/icomoon/Pencil2";
import { AddCircle as _addCircle } from "styled-icons/remix-line/AddCircle";
import { Close } from "styled-icons/evil/Close";

export const Cancel = styled(Close)`
  color: rgba(255, 255, 255, 0.6);
  height: 100%;
`;

export const CheckIcon = styled(Check)`
  color: rgba(255, 255, 255, 0.6);
  height: 100%;
`;
export const Whitelist = styled(ListPlus)`
  color: rgba(0, 0, 0, 0.6);
  height: 100%;
`;
export const Blacklist = styled(ListMinus)`
  color: rgba(255, 255, 255, 0.6);
  height: 100%;
`;

export const Pencil = styled(Pencil2)`
  color: rgba(255, 255, 255, 0.6);
  height: 100%;
`;
export const AddCircle = styled(_addCircle)`
  height: 100%;
`;
export const Trash = styled(TrashAlt)`
  color: rgba(255, 255, 255, 0.6);
  height: 100%;
`;