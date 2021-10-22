import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { Context } from '../Context/AuthContext';

import Sociais from './components/sociais';
import logoClube from '../img/logo_clube.png'
import '../styles/pages/login.css';

import api from '../services/api';


export default function LoginCompro(){

    const { authenticated, handleLogin, handleLogout } = useContext(Context);
    const history = useHistory();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (authenticated && token != "") {
          handleLogout();
        }
      }, []);

    function clearValues() {
        var elements = document.getElementsByName("txt");
        elements.forEach(element => {
            console.log(element);
            element.value = '';
        });
    }

    function handleScroll() {
        window.scroll({
            top: document.body.offsetHeight,
            left:0,
            behavior: 'smooth',
        });
    }


    function verifyAccess(){
        api.post('/loginComprador', { 
        cpf_u: document.getElementById("cpf").value, 
        pass_u: document.getElementById("pass").value, 
    }).then((result) => {
        const data = {
            cpf: result.data.cpf_u,
            token: result.data.token
        }
        //localStorage.setItem('authenticatedTrue', JSON.stringify(data));
        try {
            let access = "associate";
            handleLogin(data.token, access);
        }
        catch(error) {
            <Redirect to="/eu_compro"/>
        }


    }).catch(function(error) {
        alert ('MENSAGEM DE ERRO! Cooperado, primeiramente verifique os dados preenchidos! Se já possui cadastro, não tente cadastrar novamente. Mas se mesmo assim esse erro persistir, contate a Cooperativa.');
        clearValues();
    });

}

    return (
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
            <div className="row" onClick={handleScroll}>
                    
                    <form className="col s12 m8 l4 offset-m2 offset-l4 boxForm" method="post" action="">
                                        <div className="row">
                                        <div className="col s2"></div>
                                            <div className="col s7 m8 l8">
                                                <input required className="validate" type="text" name="txt" id="cpf"
                                                    data-length="11" placeholder="CPF"/>
                                                <span className="helper-text" data-error="Máximo 11 caracteres." ></span>
                                            </div>
                                        </div>
                                        <div className="row">
                                        <div className="col s2"></div>
                                            <div className="col s7 m8 l8">
                                                <input required className="validate" type="password" name="txt" id="pass"
                                                     placeholder="Senha"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s2"></div>
                                            <div className="col s7 l8">
                                          
                                            <Link to="/esqueci_senha">
                                            <label>
                                                <input  type="checkbox" className="filled-in" checked="checked" />
                                                <span className="formatLink">Esqueci minha senha</span>
                                            </label>
                                            </Link>
                                            
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col s2 m2 l2"></div>
                                            <button type='button' name='btn_login'
                                                className='col s7 m8 l8 btn btn-medium waves-effect waves-light ' onClick={verifyAccess}>
                                                    Entrar</button>
                                        </div>
                                        <div className='row'>
                                            <div className="col s2 l4"></div>
                                            <div className="col s7 m8 l4 center spacement">
                                                <Link className="formatLink" to="/registrar_comprador">Cadastre-se</Link>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className="col s2 l4"></div>
                                            <div className="col s7 m8 l4 center spacement">
                                                 <Link className="formatLink" to="/">Voltar</Link>
                                            </div>
                                        </div>
                                    </form>
                </div>
            </section>
            
        </div>


    );
}
