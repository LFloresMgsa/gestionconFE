import React from 'react';
import { LoadFiles } from './LoadFiles';
import fondo from '../imagenes/fondodos.png';

const Categorias = (props) => {
  const fondoStyle = {
    backgroundImage: `url(${fondo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Ajusta la altura según tus necesidades
    // Otras propiedades de estilo según tus necesidades
  };

  return (
    <div style={fondoStyle}>
      <LoadFiles pCategory={props.pCategory} />
    </div>
  );
};

export { Categorias };
