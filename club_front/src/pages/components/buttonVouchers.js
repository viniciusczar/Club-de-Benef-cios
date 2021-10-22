import React from 'react';
import '../../styles/components/buttonVouchers.css';

export default function ButtonVouchers(props) {
    const { textButton, onClick, disabled } = props; 
    
    return(
        <div>
            <button className="buttonVouchers" 
            disabled={disabled}
            onClick={onClick}>
                {textButton}
            </button>
        </div>
    )
}