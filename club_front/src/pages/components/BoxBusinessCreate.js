import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import '../../styles/components/boxCreateBusiness.css';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Input from '@material-ui/core/Input';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import { categories } from '../../services/categories.json';

import ImgNull from '../../img/logos/image_nula.jpg';

export default function BoxBusinessCreate(props){

    //const [ categorie, setCategorie ] = useState([]);
    const [ selectedOption, setSelectedOption ] = useState('');
    const [ name, setName ] = useState('');
    const [ inputFile, setInputFile ] = useState();
    const [ nameFile, setNameFile ] = useState('Insira a sua logo aqui');
    const [ values, setValues ] = useState({});

    const history = useHistory();

    const { idUser } = props;

    useEffect(() => {
        //loadCategories();
    }, [])

    const useStyles = makeStyles((theme) => ({
        formControl: {
          margin: theme.spacing(2),
          minWidth: 210,
          background: 'white',
          border: '1px',
          borderRadius: 5,
          marginLeft: '-1px',
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
        textInput: {
            color: '#003641'
        }
      }));

      /*const loadCategories = async() => {
        const result = await api.get('/categories');
        setCategorie(result.data);
    }*/
      
      const classes = useStyles();

      /*const handleChange = (event) => {
        setSelectedOption(event.target.value);
      };*/

      function handleChangeInputFile (event) {
        const file = event.target.files;
        setInputFile(file);
        setNameFile(file[0].name);
      }

      const handleChangeInputName = (event) => {
        const {value} = event.target;
        setName(value);
    }

      const handleChangeCategories = (event) => {
        setSelectedOption(event.target.value);
      };

    async function onSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const file = inputFile[0];

        data.append('file', file);
        data.append('name', name);
        data.append('categorie_id', selectedOption);
        data.append('id', idUser);
        
            await api.post('/negocio/criar', data);
            history.push('/eu_vendo/perfil');
    }


    return(
        <div className='boxCreate'>
            <form onSubmit={onSubmit} className="space-in-form" enctype="multipart/form-data">
                <div className="space-in-file">
            <div className="boxLogoContent">
                        <img src={ImgNull}/>
                </div>
               <div className="file-field input-field inputStyleEditionFile">
                  <div className="btn">
                      
                     <span>Clique aqui</span>
                     <AttachFileIcon fontSize="small"/>
                     <input type = "file" id="fileInput" onChange={handleChangeInputFile}/>
                  </div>
                  <div className="file-path-wrapper">
                     <input className="file-path validate" type = "text"
                        placeholder = {nameFile} name="file-path"/>
                  </div>
               </div>
            </div>

            <div className="space-in-input">
                <div className="boxNameContent">
                        <div className="input-field">
                        <input 
                        placeholder="Digite o nome fantasia da sua empresa" 
                        id="nameInput" 
                        type="text"
                        onChange={handleChangeInputName}
                        />
                        </div>
                </div>
                <label>Escolha a qual categoria ela pertence</label>
                <div className="boxCategorieContent">
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" className={classes.textInput}>Categorias</InputLabel>
                <Select
                 labelId="demo-mutiple-name-label"
                 id="demo-mutiple-name"
                 value={selectedOption}
                 onChange={handleChangeCategories}
                 input={<Input />}
                className={classes.selectEmpty}
                >
                    {categories.map(cat => (
                        <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                ))}
                </Select>
                </FormControl>
                </div>

                <div className="buttonSubmit">
                <button className="btn waves-effect waves-light" type="submit" name="action">Salvar
                <DoneOutlineIcon className="iconSubmit" fontSize="small"/>
                </button>
                </div>

            </div>
            </form>
               </div>
    )
}

/*
const { className, modalRef } = props;

    const contain = modalRef.current.contains(event.target);
    if (contain) { //se clicar fora do modal, ele DESaparece
      console.log("hidden");
      setDropdown("");
      document.body.removeEventListener("click", closeDropdown);
    }

    return(
        <div ref={modalRef} className={`${className} container`}>
            <h4></h4>
                <div className="logoBusiness">
                    <div className="boxImage">
                        <img src="" />
                    </div>
                </div>
                <div>
                    <h2></h2>
                </div>
                
        </div>
    )


    <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label" className={classes.textInput}>Categorias</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                onChange={onChangeInput}
                className={classes.selectEmpty}
                >
                    {categorie.map(cat => (
                        <MenuItem key={cat.id} value={cat.id}>{cat.dsc}</MenuItem>
                ))}
                </Select>
                </FormControl>
*/