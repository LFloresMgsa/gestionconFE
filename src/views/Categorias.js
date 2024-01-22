import React, { Fragment, useState, useEffect, Component } from 'react';
import { LoadFiles } from './LoadFiles';
import fondo from '../imagenes/fondotodos.png';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

import CryptoJS from 'crypto-js';

class Categorias extends Component {

  componentDidMount() {

    //---------------------------------
    // Función para desencriptar
    // Obtén la cadena de consulta de la URL
    const queryString = window.location.search;

    // Parsea la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtiene el valor del parámetro 'path'
    const security = urlParams.get('seg');

    //---------------------------------
    // console.log("Valor de 'seg todo path': ", security);


    // const bytesDesencriptados = CryptoJS.AES.decrypt(security, "977611");
    // console.log("Bytes desencriptados:", bytesDesencriptados.toString());


    // try {
    //   const cadenaDesencriptada = CryptoJS.enc.Utf8.stringify(bytesDesencriptados);
    //   console.log("Cadena desencriptada:", cadenaDesencriptada);
    // } catch (error) {
    //   console.error("Error al convertir a UTF-8:", error.message);
    // }

    // // Extraer el valor de "seg"
    // const segValor = new URLSearchParams(cadenaDesencriptada).get("seg");
    // console.log("Valor de 'seg': ", segValor);
    //---------------------------------



    if (!cookies.get('Sgm_cUsuario')) {

      //console.log(this.props.pTipo );

      if (security == 'true') {


        // window.location.href = "./inicio";
      }

    }
  };


  render() {



    const fondoStyle = {
      backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url(${fondo})`, // Opacidad agregada con rgba
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      // Otras propiedades de estilo según tus necesidades
    };


    return (

      <div style={fondoStyle}>
        <LoadFiles pCategory={this.props.pCategory} />
      </div>

    );
  }
};

export default Categorias;
