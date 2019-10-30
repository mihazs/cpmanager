import * as bv from "brazilian-values";
import React, { useEffect, useState } from "react";
import { BrazilMaskComponent } from "react-brazil";
export const CPFormat = ({ text }) => {
  if (bv.isCNPJ(text)) {
    return <>{bv.formatToCNPJ(text)}</>;
  }
  if (bv.isCPF(text)) {
    return <>{bv.formatToCPF(text)}</>;
  }
  return <>{text}</>;
};
export const CPInput = props => {
  const [type, setType] = useState("cpf");
  return (
    <>
      <BrazilMaskComponent {...props} onKeyDown = {(e)=>{
          const l = (e.target.value.match(/\d/g) || []).length;
          if(l >= 11 && e.key.match(/\d/g)){
            setType("cnpj");
          } else {
            setType("cpf");
          }

      }} format={type} />
    </>
  );
};
