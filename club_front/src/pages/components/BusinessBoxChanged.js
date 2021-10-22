import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import api from '../../services/api';

import '../../styles/components/boxChangeBusiness.css';

export default function BusinessBoxChanged(props) {

    const [ categorie, setCategorie ] = useState([]);
    const [ selectedOption, setSelectedOption ] = useState('');

    useEffect(() => {
        loadCategories()
    }, [])

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(1),
          minWidth: 220,
          background: 'white',
          border: '1px',
          borderRadius: 5,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        textInput: {
            color: '#003641'
        }
      }));
      
      const classes = useStyles();

    /*const loadDataBusiness = async() => {
        const result = await api.get('/negocio/dados', {
            id: props.id
        })
    }*/



    const loadCategories = async() => {
        const result = await api.get('/categories');
        setCategorie(result.data);
    }

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption)
      };

    return(
        
        <div className="boxDataBusinesses">
            <div className="logoEdit">
                <img src={props.image}></img>
            </div>
            <form action="#">
            <div class="input-field">
                        <input value="teste" className="first_name" type="text" class="validate"/>
                        <label class="active" for="first_name2">{props.idUser}</label>
                    </div>
                <div class="file-field input-field col l3">
                <div class="btn">
                    <span>Arquivo</span>
                    <input type="file" className="inputFile"></input>
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" />
                </div>
            </div>
            </form>
            <div>
           <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label" className={classes.textInput} >Categorias</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedOption}
            onChange={handleChange}
            className={classes.selectEmpty}
            >
                <MenuItem value="">
                    <em>Nenhuma</em>
                </MenuItem>
                {categorie.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>{cat.dsc}</MenuItem>
            ))}
            </Select>
            </FormControl>
            </div>
        </div>
    );
}
