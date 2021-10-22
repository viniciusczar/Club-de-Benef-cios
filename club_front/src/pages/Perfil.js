import React, { useState, useEffect, useContext  } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './components/header';
import NavigationBusiness from './components/navigationBusiness';
import BusinessBoxChanged from './components/BusinessBoxChanged';
import BoxBusinessCreate from './components/BoxBusinessCreate';

import '../styles/pages/perfil.css';

import api from '../services/api';

import jwt_decode from 'jwt-decode';

import { Context } from '../Context/AuthContext';
import Img from '../img/logos/fake.png';

export default function Perfil(){

    const { authenticated } = useContext(Context); 
    const history = useHistory();
    const [ businesses, setBusinesses ] = useState();
    
    //const [dropdown, setDropdown] = useState("");
    //const modalRef = useRef(null);
    var decoded = jwt_decode(localStorage.getItem('token'));

    useEffect(() => {
        /*if(!authenticated) {
            history.push('/');
        }*/
        loadInformation();
    }, []);


    const loadInformation = async() => {
        const result = await api.post('/negocio/dados', {
            id: decoded.id
        });
        console.log(result);
        setBusinesses(result);
    }

    /*const toggleDropdown = () => {
        console.log("show");
        //se clicar no botão, modal aparece
        setDropdown("show");
        document.body.addEventListener("click", closeDropdown);
      }
    
      const closeDropdown = event => {
        event.stopPropagation(); //impede de executar listeners dos filhos
      };
      */
    

    return (
        <div>
            <header>
            <Header />
            <NavigationBusiness />
            </header>
            <div>
            <header>
            {businesses ? 
                <BusinessBoxChanged idUser={decoded.id} businesses={businesses}/>  
                :
                <>
                <BoxBusinessCreate idUser={decoded.id}/>
                </>
            }
            </header>
            </div>
        </div>
    )
}
                