import React, {useState, useEffect} from 'react';
import '../../styles/components/cardVouchers.css';


export default function CardVouchers(props){
    return(
        <div>
                <div class="cardPanel teal">
                    <h4 class="white-text">
                        {props.id}
                    </h4>
                    <span class="white-text">
                        {props.name}
                    </span>
                </div>
        </div>
    );
}