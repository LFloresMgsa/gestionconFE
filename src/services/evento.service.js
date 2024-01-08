//evento.service.js
import { Try } from '@mui/icons-material';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const eventoService = {
  obtenerUsuario,
  obtenerFiles,
  obtenerToken
  
};

function obtenerToken(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

  const url = `/api/gescon/auth`;
  return Fetch.postv2(url, params, options).then((res) =>

  
    handleResponse(res, false)
  );
}

function obtenerUsuario(dataJson) {
  const options = { headers: authHeader(), body: JSON.stringify(dataJson) };
  const params = {};

//console.log(dataJson);

  const url = `/api/gescon/sgm_usuarios/auth`;
  return Fetch.postv2(url, params, options).then((res) =>
    handleResponse(res, false)
  );
}


function obtenerFiles(dataJson, category) {
  try {
    const options = { headers: authHeader() };
    const params = {};

    // Utiliza Fetch.get para realizar una solicitud GET
    const url = `/api/gescon/documents?category=${category}`;

    //console.log(url);

    return Fetch.get(url, params, options).then((res) =>
      handleResponse(res, false)
    );
  } catch (error) {
    console.error('Error en la solicitud:', error);
    // Puedes lanzar o devolver un objeto de error personalizado si es necesario.
    throw error;
  }
}