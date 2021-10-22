import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import { SiCashapp } from "react-icons/si";
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Modal from 'react-modal';
import api from '../../services/api';
import Button from '@material-ui/core/Button';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';




const useStyles = makeStyles({
  root: {
    margin: 10,
    maxWidth: 345
  },
  media: {
    height: 140,
  },
  modal: {
    width: "40%",
    margin: "auto",
    display: "flex",
    background: "#003641",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    height: "17rem",
    borderRadius: "4px",
    padding: "5px",
  },
  modalDiv: {
    display: "flex"
  }
});


export default function MediaCard(props) {
  const classes = useStyles();

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [voucheGeneration, setVoucheGeneration] = useState('')
  const [dateExpirion, setDateExpirion] = useState('')
  function openModal() {
    setIsOpen(true);
  }



 function formatDate(date) {
   const options = { year: "numeric", month: "long", day: "numeric"}
   return new Date(date).toLocaleDateString(undefined, options)
 }

  // setDateExpirion(formatDate)


  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleVoucher(id = 1) {
    api.post('/autorizacao', {
      advert_id: 1
    }).then((result) => {
      setVoucheGeneration(result.data.authorization.id)
       var newDate = result.data.authorization.tm_val
      setDateExpirion(formatDate(newDate))

    })

  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}

          title="Contemplative Reptile">
          <div id="contentImg">
            <img src={props.image}>
            </img>
          </div>
          <hr></hr>
          <div id="price">
            <div id="line1">
              <span id="valueProduct">R$ </span> <span id="primaryPirce"> {props.price}</span>
            </div>
            <div id="line2">
              <small id="descont">Desconto de </small><small id="valueDescont"> - 2,50</small><MonetizationOnIcon id="badgeCash" />
            </div>
          </div>
          <hr></hr>
        </CardMedia>

        <CardContent id="contentBodyCard">
          <Typography gutterBottom variant="h5" color="inherit" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div id="footerCard">
        <Button size="small" color="primary" className="buttonFooter" onClick={openModal} >
          Gerar Voucher
        </Button>
        <Button size="small" color="primary">
          + Produtos
        </Button>
      </div>

      <div id="modalDiv">
        <Modal
          isOpen={modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={classes}
          contentLabel="VOUCHER"
          className={classes.modal}
        >
          <h5 id="titleModal">ANOTE SEU VOUCHER</h5>
          <div id="voucherModal">
            <span>{voucheGeneration}</span>
            <small>Expira em: {dateExpirion}</small>
          </div>

          <div id="valueModal">Valor a pagar: {(props.price - 2.5).toFixed(2)}<MonetizationOnIcon id="badgeCash" /></div>

          <div id="buttonsFooter">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<ArrowUpwardIcon />}
              onClick={handleVoucher}
            >
              Gerar Voucher
            </Button>

            <Button variant="contained" color="secondary">
              Ver Vouchers
            </Button>
            <Button
              variant="contained"
              onClick={closeModal}
              color="secondary"
              id="closeButton"
            >
              X
            </Button>
          </div>
        </Modal>
      </div>
    </Card>

  );
}