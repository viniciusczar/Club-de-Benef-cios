import React, { createContext } from 'react';

import useAuth from './hooks/useAuth';
const Context = createContext();
function AuthProvider({ children }) {

    const { authenticated, loading, handleLogin, handleLogout, loginRegisterPanel, loginRegisterBusinesses } = useAuth();

    return (
        <Context.Provider value={{ authenticated, handleLogin, handleLogout, loading, loginRegisterPanel, loginRegisterBusinesses}}>
            {children}
        </Context.Provider>
    );
}

export { Context, AuthProvider };
