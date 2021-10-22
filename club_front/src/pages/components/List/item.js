import React from 'react';

export default function item ({dados}){
    return(
        <div>
            <img src={dados.id}></img>
            <div className="cardDescription">
            <p>{dados.name}</p>
            </div>
        </div>
    )
}