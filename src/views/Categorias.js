import React, { Fragment, useState, useEffect, Component } from 'react';
import { LoadFiles } from './LoadFiles';
import fondo from '../imagenes/fondotodos.png';
import Cookies from 'universal-cookie';
const cookies = new Cookies();



class Categorias extends Component {

  componentDidMount() {
    if (!cookies.get('Sgm_cUsuario')) {

//console.log(this.props.pTipo );

      if (this.props.pTipo == "seguro") {
        window.location.href = "./inicio";
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
