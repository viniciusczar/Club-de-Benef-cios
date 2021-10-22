import React from "react";
import InputMask from "react-input-mask";

const InputData = (props) => { 
    return <InputMask 
    mask="99/99/9999" 
    value={props.value} 
    onChange={props.onChange} 
    type="text" 
    name="data"
    data-length="8" 
    focus="none" 
    placeholder="Insira a sua data de nascimento" />
  }
  
 export default InputData;