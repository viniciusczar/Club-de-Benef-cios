import React from 'react';
import '../../styles/components/tools/modal.css';

export default function Modal(props) {
    const { className, modalRef } = props;

    /*const contain = modalRef.current.contains(event.target);
    if (contain) { //se clicar fora do modal, ele DESaparece
      console.log("hidden");
      setDropdown("");
      document.body.removeEventListener("click", closeDropdown);
    }*/

    return(
        <div ref={modalRef} className={`${className} modal`}>
            <p>Meu modal!</p>
        </div>
    )
}