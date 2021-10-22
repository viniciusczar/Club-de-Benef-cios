import React, { useState, useEffect, useContext } from 'react';
import '../../styles/components/navigationBusiness.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { Context } from '../../Context/AuthContext';

export default function NavigationBusiness(props) {
    const history = useHistory();
    const { handleLogout } = useContext(Context);

    return (
        <ul className="nav">
            <li><Link className="a" onClick={handleLogout}>Sair</Link></li>
            <li><Link className="a" to={props.perfil}>Perfil</Link></li>
            <li><Link className="a" to={props.routerBusines}>{props.nameBusines}</Link></li>
            <li><Link className="a" to={props.home}>Home</Link></li>
        </ul>
    );
}
