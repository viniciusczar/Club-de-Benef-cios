import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Context } from '../Context/AuthContext';
import InputTelefone from './components/inputTelefone';
import InputCnpj from './components/inputCnpj';
import api from '../services/api';


import Sociais from './components/sociais';
import logoClube from '../img/logo_clube.png';
import '../styles/pages/register.css';
<link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,600;1,400&display=swap" rel="stylesheet"></link>


export default function RegisterOwner (){

    const { authenticated, loginRegisterBusinesses } = useContext(Context);
    const [telefone, setTelefone] = useState('');
    const [cnpj, setCnpj] = useState('');

    
    function clearValues() {
        var elements = document.getElementsByName("txt");
        elements.forEach(element => {
            console.log(element);
            element.value = '';
        })
        setTelefone('');
        setCnpj('');
    }

     function confirmRegister(){
        api.post('/registrarVendedor', { 
        cpf_u: document.getElementById("cpf").value, 
        cnpj_u: cnpj, 
        pass_u: document.getElementById("pass").value, 
        telefone_u: telefone, 
        email_u: document.getElementById("email").value
    }).then((result) => {
        alert ('Cadastrado com sucesso! Faça o seu login abaixo.');
        const data = {
            cpf: result.data.cpf_u,
            token: result.data.token
        }
        localStorage.setItem('authenticatedTrue', JSON.stringify(data));
        try { 
            loginRegisterBusinesses(data.token);
        }
        catch(error) {
            <Redirect to="/eu_vendo"/>
        }


    }).catch(function(error) {
        clearValues();
        alert ('MENSAGEM DE ERRO! Cooperado, primeiramente verifique os dados preenchidos! Se já possui cadastro, não tente cadastrar novamente. Mas se mesmo assim esse erro persistir, contate a Cooperativa.');
        console.log(error);
    });

}


    function handleScroll() {
        window.scroll({
            top: document.body.offsetHeight,
            left:0,
            behavior: 'smooth',
        });
    }
  

    return (
        
        <div>
        
        <header>
            <Sociais></Sociais>
        </header>
        <br></br>
        <br></br>
        <section className="boxContent">
            <div class="row">
                <div class="col s2 m4 l4"></div>
                <div class="col s10 m6 l6">
                    <img src={logoClube} width="70%"></img>
                </div>
            </div>
        <div class="row" onClick={handleScroll}>
                
                <form class="col s12 m8 l4 offset-m2 offset-l4 boxForm" method="post" action="">
                <p className="textRecomendation">Prezado(a), caso já possua outro cadastro, favor inserir os mesmos dados de contato (e-mail e telefone) e a mesma senha de acesso.</p>
                                    <div class="row">
                                    <div class="col s2"></div>
                                        <div class="input-field col s7 m8 l8">
                                            <input type="text" name="txt" id="cpf" placeholder="Insira seu CPF"
                                                data-length="11" focus="none" />
                                            <span class="helper-text" data-error="Máximo 11 caracteres." ></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                    <div class="col s2"></div>
                                        <div class="input-field col s7 m8 l8">
                                        <InputCnpj id="cnpj" value={cnpj} onChange={(event) => setCnpj(event.target.value)}/>
                                            <span class="helper-text" data-error="Máximo 14 caracteres." ></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                    <div class="col s2"></div>
                                        <div class="input-field col s7 m8 l8">
                                            <input  type="text" name="txt" id="email"
                                                data-length="38" focus="none" placeholder="Insira seu e-mail"/>
                                            <span class="helper-text" data-error="Máximo 38 caracteres." ></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                    <div class="col s2"></div>
                                        <div class="input-field col s7 m8 l8">
                                        <InputTelefone id="telefone" value={telefone} onChange={(event) => setTelefone(event.target.value)}/>
                                            <span class="helper-text" data-error="Máximo 11 caracteres."></span>
                                        </div>
                                    </div>
                                    <div class="row">
                                    <div class="col s2"></div>
                                        <div class="input-field col s7 m8 l8">
                                            <input type="password" name="txt" id="pass"
                                                data-length="14" focus="none" placeholder="Insira sua senha"/>
                                        </div>
                                    </div>
                                    <div class='row bottomBox'>
                                        <div class="col s1 m1 l1 offset-m1"></div>
                                        <Link to="/eu_vendo">
                                                <button type='submit' name='btn_register'
                                                class='col s4 m3 l4 btn btn-medium waves-effect waves-light '>Voltar</button>
                                            </Link>
                                        <div class="col s1 l2 offset-m1"></div>
                                            <button type='button' name='btn_register'
                                            class='col s4 m3 l4 btn btn-medium waves-effect waves-light ' onClick={confirmRegister}>Confirmar</button>
                                    </div>
                                </form>
            </div>
        </section>
        
    </div>
    
    )
}