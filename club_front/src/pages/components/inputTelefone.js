import React from "react";
import InputMask from "react-input-mask";

const InputTelefone = (props) => {
    return <InputMask 
    mask="(99)99999-9999"
    value={props.value} 
    onChange={props.onChange} 
    type="text" 
    name="telefone"
    data-length="14" 
    focus="none" 
    placeholder="Insira seu telefone" />
  }

export default InputTelefone;