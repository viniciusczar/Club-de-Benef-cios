import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthProvider } from './Context/AuthContext';
import { Context } from './Context/AuthContext';


import Initial from './pages/Initial';
import LoginCompro from './pages/LoginCompro';
import LoginVendo from './pages/LoginVendo';
import Admin from './pages/Admin';
import RegisterAssociate from './pages/RegisterAssociate';
import RegisterOwner from './pages/RegisterOwner';
import ResetPassword from './pages/ResetPassword';
import TokenReset from './pages/TokenReset';
import Authorizations from './pages/components/authorizations';
import Home from './pages/Home';
import Panel from './pages/Panel';
import Adverts from './pages/Adverts';
import SolicitedPassword from './pages/SolicitedPassword';
import Perfil from './pages/Perfil';
import Vouchers from './pages/Vouchers';


function CustomRoute({ isPrivate, ...rest }){
    const { loading, authenticated } = useContext(Context);

    if (loading) {
        return <h1>Loading ...</h1>;
    }

    if(isPrivate && !authenticated) {
        return <Redirect to="/" />
    }
    return <Route {...rest} />;
    
}


function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Initial} />
            <AuthProvider>
            <Route exact path="/eu_compro" component={LoginCompro} />
            <Route exact path="/eu_vendo" component={LoginVendo} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/registrar_comprador" component={RegisterAssociate} />
            <Route exact path="/registrar_vendedor" component={RegisterOwner} />
            <Route exact path="/esqueci_senha" component={ResetPassword} />
            <Route exact path="/senha_solicitada" component={SolicitedPassword} />
            <Route exact path="/trocar_senha" component={TokenReset} />
            <Route isPrivate exact path="/autorizacoes" component={Authorizations} />
            <CustomRoute exact path="/eu_vendo/negocio" component={Home} />
            <CustomRoute exact path="/eu_vendo/perfil" component={Perfil} />
            <CustomRoute exact path="/eu_vendo/vouchers" component={Vouchers} />
            <Route isPrivate exact path="/eu_compro/painel" component={Panel} />
            <Route isPrivate exact path="/painel/anuncios" component={Adverts} />
            </AuthProvider>
        </Switch>
        </BrowserRouter>
    );
}


export default Routes;