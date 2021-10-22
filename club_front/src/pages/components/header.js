import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import '../../styles/components/header.css';

import logoHeader from '../../img/logo_verde.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));
  
  export default function SearchAppBar() {

    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
                        <div className="imageHeader">
                            <img src={logoHeader}/>
                        </div>

          </Toolbar>
        </AppBar>
      </div>
    );
  }

  