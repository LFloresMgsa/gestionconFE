import React from 'react';
import { LoadFiles } from './LoadFiles';
import fondo from '../imagenes/fondomanuales.png';

const Categorias = (props) => {
  const fondoStyle = {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url(${fondo})`, // Opacidad agregada con rgba
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    // Otras propiedades de estilo según tus necesidades
  };

  return (
    <div style={fondoStyle}>
      <LoadFiles pCategory={props.pCategory} />
    </div>
  );
};

export { Categorias };
