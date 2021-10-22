import React from "react";
import InputMask from "react-input-mask";

const InputCnpj = (props) => { 
    return <InputMask 
    mask="99.999.999/9999-99" 
    value={props.value} 
    onChange={props.onChange} 
    type="text" 
    name="cnpj"
    data-length="18" 
    focus="none" 
    placeholder="Insira seu CNPJ" />
  }
  
 export default InputCnpj;