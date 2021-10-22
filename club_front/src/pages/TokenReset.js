import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useHistory } from "react-router-dom";

import Sociais from './components/sociais';
import logoClube from '../img/logo_clube.png'

export default function TokenReset() {

    const history = useHistory();

    function clearValues() {
        var elements = document.getElementsByName("txt");
        elements.forEach(element => {
            element.value = '';
        })
    }
    
    function confirmReset() {

        var [, id, token] =  window.location.href.split('?')
        const cpfUser = id.slice('$', -1);

        const password1 = document.getElementById("pass").value;
        const password2 = document.getElementById("pass_two").value;

        if(password1 == password2) {
            api.post('/resetarSenha', {
                id:cpfUser,
                token: token,
                password: password2
            }).then((result) => {
                alert('Sucesso! Favor prosseguir com o seu login e nova senha.');
                history.push('/');
            }).catch(function(error){
                clearValues();
                history.push('/');
            })
           //const tokenReset = localStorage.getItem('tokenReset');
           //console.log(tokenReset);
        }
        
    }
    


    return(
        <div>
            <header>
                <Sociais></Sociais>
            </header>
            <br></br>
            <br></br>
            <br></br>
            <section className="boxContent">
                <div className="row">
                    <div className="col s2 m4 l4"></div>
                    <div className="col s10 m6 l6">
                        <img src={logoClube} width="70%"></img>
                    </div>
                </div>
                <div className="row">
                    <form className="col s12 m8 l4 offset-m2 offset-l4 boxForm" method="post" action="">
                        <br></br>
                                        <div className="row">
                                        <div className="col s2"></div>
                                            <div className="col s7 m8 l8">
                                                <input type="password" name="txt" id="pass" focus="none" placeholder="Insira a sua nova Senha"/>
                                                <span className="helper-text" ></span>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className="row">
                                        <div className="col s2"></div>
                                            <div className="col s7 m8 l8">
                                                <input type="password" name="txt" id="pass_two" focus="none" placeholder="Confirme a sua nova Senha"/>
                                                <span className="helper-text" ></span>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className='row bottomBox'>
                                            <div className="col m1 l4"></div>
                                                <button type='button' name='btn_register'
                                                className='col s4 l4 btn btn-medium waves-effect waves-light ' onClick={confirmReset} >Confirmar</button>
                                        </div>
                                        <br></br>
                                    </form>
                </div>
                </section>
        </div>
    )
}