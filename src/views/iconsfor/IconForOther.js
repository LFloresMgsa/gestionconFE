// En un archivo llamado IconForOtherFile.js
import React from 'react';
import OtherFileIcon from '../../imagenes/icons/other.png'; // Ajusta la ruta según la ubicación real de tu imagen

const IconForOtherFile = () => {
  return <img src={OtherFileIcon} alt="Icono de Otro Tipo de Archivo" width="28" height="28"  />;
};

export default IconForOtherFile;