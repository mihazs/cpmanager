import React from "react";
import styled from "styled-components";
import { Spinner4 as _spinner } from "styled-icons/icomoon/Spinner4";
import { Column } from "rbx";
const Spinner = styled(_spinner)`
  color: black;
  @keyframes anim-rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  animation: anim-rotate 2s infinite linear;
  text-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
  z-index: 950;
  width: 5em;
`;
const Wrapper = styled(Column.Group)`
  height: 100vh;
  width: 100%;
  opacity: ${props => (props.show ? 1 : 0)};
  animation: all 0.2s;
`;

export default function({ show = true }) {
  return (
    <>
      <Wrapper vcentered show={show}>
        <Column textAlign="centered">
          <Spinner />
        </Column>
      </Wrapper>
    </>
  );
}
