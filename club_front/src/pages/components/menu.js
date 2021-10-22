import React, { useState, useEffect, useContext } from 'react';
import '../../styles/components/header.css';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Context } from '../../Context/AuthContext';

export default function Menu() {

    const { handleLogout } = useContext(Context);

    return (
        <div class="row">
            <div className="space-between-top"></div>
        <div class="col s4 m2 l2 offset-s2 offset-m8 offset-l4 center">
        <button type='reset' name='btn_logout'
            class='col s8 l8 btn btn-medium waves-effect waves-light buttonHeader'>
                Voltar
        </button>
        </div>
        <div class="col s4 m2 l1 center">
        <button type='reset' name='btn_logout'
            class='col s7 l8 btn btn-medium waves-effect waves-light buttonHeader' onClick={handleLogout}>
                Sair
        </button>
        </div>       
    </div>
    )
}