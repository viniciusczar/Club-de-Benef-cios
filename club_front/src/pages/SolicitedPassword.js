import React from 'react';
import Sociais from '../pages/components/sociais';
import logoClube from '../img/logo_clube.png'
import '../styles/pages/reset.css';

export default function SolicitedPassword() {
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
                        <div id="text-style-confirmation">
                            <p>E-mail enviado com sucesso!</p>
                            <br></br>
                            <p>Siga as instruções recebidas para recuperar sua senha.</p>
                        </div>
                        
                    </form>
                </div>
                </section>
        </div>
    );
}