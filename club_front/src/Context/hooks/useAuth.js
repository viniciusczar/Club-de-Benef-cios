import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import api from '../../services/api';

export default function useAuth () {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState (true);
    const history = useHistory();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token !== "") {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }
       
        setLoading(false)

    }, []);

    
    async function handleLogin(token, access) {
                localStorage.setItem('token', JSON.stringify(token));
                api.defaults.headers.Authorization = `Bearer ${token}`; 
                setAuthenticated(true);
            if(access === "associate") {
                history.push('/eu_compro/painel');
            }
            else if(access === "owner") {
                history.push('/eu_vendo/negocio');
            }
            <Redirect to="/" />
        }

        // Função Antiga
    /*async function handleLogin() {
        const { data: { token } } = await fetch(`http://localhost:3030/loginComprador`, {
            method: "POST"
        });
        localStorage.setItem('token', JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`; 
        setAuthenticated(true);
        <Redirect to="/painel"/>
    }*/

    function handleLogout() {
        setAuthenticated(false)
        localStorage.removeItem('token');
        localStorage.clear();
        api.defaults.headers.Authorization = undefined;
        history.push('/');
    }

    async function loginRegisterPanel() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`; 
        setAuthenticated(true);
        console.log('Redirecionar...');
        history.push('/eu_compro');
    }

    async function loginRegisterBusinesses() {
        const token = localStorage.getItem('token');
        api.defaults.headers.Authorization = `Bearer ${token}`; 
        setAuthenticated(true);
        console.log('Redirecionar...');
        history.push('/eu_vendo');
    }

    if(loading) {
        return <h1>Carregando a página. Aguarde um instante...</h1>
    }

    return { authenticated, loading, handleLogin, handleLogout, loginRegisterPanel, loginRegisterBusinesses };
}
