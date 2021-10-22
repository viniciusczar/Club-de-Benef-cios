import React, { useState, useEffect, useContext } from 'react';

import Header from './components/header';
import NavigationBusiness from './components/navigationBusiness';
import Menu from './components/menu';

import { Context } from '../Context/AuthContext';
import { useHistory, useRouteMatch } from 'react-router-dom';
import api from '../services/api';

//import jwt_decode from 'jwt-decode';

export default function Businesses(){

    const [ nameBusiness, setNameBusiness ] = useState();
    const [ posts, setPosts ] = useState();
    //const decoded = jwt_decode(localStorage.getItem('token'));

    const { authenticated } = useContext(Context); 
    const history = useHistory();

    useEffect(() => {
        if(!authenticated) {
            history.push('/');
        }
        loadInformation();
      }, []);

      const loadInformation = async() => {
          console.log('teste');
    }


    return(
    <div>
        <header>
            <Header />
        </header>
        <body>

                <NavigationBusiness />

        </body>
    </div>
    
    )
}