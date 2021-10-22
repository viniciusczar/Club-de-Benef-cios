import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/initial.css';

import Sociais from './components/sociais';
import logoClube from '../img/logo_clube.png';

<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,600;1,400&display=swap" rel="stylesheet"></link>

//import '../css/style.css';

export default function Initial(){
    return(     
        <div>
                <Sociais></Sociais>

                <div className="row">
                    <div className="col s2 m4 l3"></div>
                    <div className="col s10 m6 l7">
                        <img className="block-image" src={logoClube} width="80%"></img>
                        <div className="options">
                            <div className="row">
                                <div className="col s8 m12 l12">
                                <Link to="/eu_compro" className="bottomAccess">
                                <div className="signin btn center col s12 m8 l3">
                                    Eu Compro
                                </div>
                                </Link>
                                <div className="col m1 l2"></div>
                                <Link to="/eu_vendo" className="bottomAccess">
                                <div className="signin btn center col s12 m8 l3">
                                    Eu Vendo
                                </div>
                                </Link>
                                    </div>
                                    </div>
                                </div>
                    </div>
                </div>

        </div>
       
    );
}