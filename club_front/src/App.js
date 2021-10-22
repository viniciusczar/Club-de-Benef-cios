import React from 'react';
import Routes from './routes';
import { Router } from "react-router";
import { AuthProvider } from './Context/AuthContext';
import 'materialize-css/dist/css/materialize.min.css';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes/>
      </Router>
    </AuthProvider>
  );
}

export default App;
