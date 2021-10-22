import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom'
import Sociais from '../pages/components/sociais';
import logoClube from '../img/logo_clube.png'
import '../styles/pages/reset.css';
import api from '../services/api';
import InputData from './components/inputData';;

export default function ResetPassword () {

const [ dataNascimento, setDataNascimento ] = useState();
const history = useHistory();
const refButton = React.useRef();
const refText = React.useRef();


function clearValues() {
    var elements = document.getElementsByName("txt");
    elements.forEach(element => {
        console.log(element);
        element.value = '';
    })
    setDataNascimento('');
}

/*function solicitedToken() {
    
    refButton.current.style.display = 'none';
    refText.current.style.display = 'block';

    api.post('/esqueceuSenha', {
    id: document.getElementById('cpf').value,
    data_nascimento: dataNascimento
    }).then((result) => {
        console.log(result);
        alert('Cooperado, favor verificar a sua caixa de e-mail cadastrada no Clube.')
        refText.current.style.display = 'none';
    }).catch(function(error) {
        clearValues();
        alert('MENSAGEM DE ERRO! Cooperado, favor verificar os dados e tente novamente.')
        console.log(error);
    })
}
*/

function solicitedToken() {
        refButton.current.style.display = 'none';
        refText.current.style.display = 'block';

        api.post('/esqueceuSenha', {
        id: document.getElementById('cpf').value,
        data_nascimento: dataNascimento
        }).then((result) => {
            console.log(result);
            history.push('/senha_solicitada');
        }).catch(function(error) {
            clearValues();
            alert('MENSAGEM DE ERRO! Cooperado, favor verificar os dados e tente novamente.')
        })
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
                <div className="row">
                    <form className="col s12 m8 l4 offset-m2 offset-l4 boxForm" method="post" action="">
                        <br></br>
                                        <div className="row">
                                        <div className="col s2"></div>
                                            <div className="col s7 m8 l8">
                                                <input type="text" name="txt" id="cpf"
                                                    data-length="11" focus="none" placeholder="Insira seu CPF"/>
                                                <span className="helper-text" data-error="Máximo 11 caracteres." ></span>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className="row">
                                        <div className="col s2"></div>
                                            <div className="col s7 m8 l8">
                                                <InputData id="dataNascimento" value={dataNascimento} onChange={(event) => setDataNascimento(event.target.value)}/>
                                                <span className="helper-text" data-error="Máximo 8 caracteres" ></span>
                                            </div>
                                        </div>
                                        <br></br>
                                        <div className='row bottomBox'>
                                            <div className="col m1 l1"></div>
                                            <Link to="/">
                                                <button type='button' name='btn_register'
                                                className='col s4 l4 btn btn-medium waves-effect waves-light '>Voltar</button>
                                            </Link>
                                            <div className="col m1 l2"></div>
                                                <button ref={refButton} type='button' name='btn_register'
                                                className='col s5 l4 btn btn-medium waves-effect waves-light forClick' onClick={solicitedToken}>Solicitar</button>
                                                <p ref={refText} className='contentDisplay'>Aguarde a confirmação...</p>
                                        </div>
                                        <br></br>
                                    </form>
                </div>
                </section>
        </div>
    );
}
