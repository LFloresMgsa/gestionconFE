//fecth.js
import { store } from '../store.js';

const apiHost = 'http://localhost:5000';

async function requestv2(url, params = {}, method = 'POST', options) {
  const { currentPortalID = 0, activeTabID = 0 } = store.getState();
  let fullUrl = `${apiHost}${url}`;
  const requestOptions = { method, credentials: 'same-origin', ...options };

  if (method === 'GET' || method === 'PUT' || method === 'DELETE') {
    requestOptions.headers = {
      ...requestOptions.headers,
      'Content-Type': 'application/json',
    };
    requestOptions.body = JSON.stringify(params);
  } else if (method === 'POST') {
    // Construye la URL correctamente para GET
    const queryString = objectToQueryString({ ...params });

    // Asegúrate de que la URL tenga un slash ("/") entre el host y la ruta
    const formattedUrl = url.startsWith('/') ? url : `/${url}`;

    // Concatena la cadena de consulta solo si hay parámetros
    fullUrl = `${apiHost}${formattedUrl}${queryString ? `?${queryString}` : ''}`;
  }
  //console.log(fullUrl, requestOptions)
  return await fetch(fullUrl, requestOptions);
}

async function request(url, params = {}, method = 'GET', options) {
  const { currentPortalID = 0, activeTabID = 0 } = store.getState();
  let fullUrl = `${apiHost}${url}`;
  const requestOptions = { method, credentials: 'same-origin', ...options };

  // Añade lógica para manejar el cuerpo de la solicitud para POST, PUT y DELETE
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    requestOptions.headers = {
      ...requestOptions.headers,
      'Content-Type': 'application/json',
    };
    requestOptions.body = JSON.stringify(params);
  } else if (method === 'GET') {
    // Construye la URL correctamente para GET
    const queryString = objectToQueryString({ ...params });

    // Asegúrate de que la URL tenga un slash ("/") entre el host y la ruta
    const formattedUrl = url.startsWith('/') ? url : `/${url}`;

    // Concatena la cadena de consulta solo si hay parámetros
    fullUrl = `${apiHost}${formattedUrl}${queryString ? `?${queryString}` : ''}`;
  }

  return await fetch(fullUrl, requestOptions);
}

function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    .join('&');
}



function get(url, params, options) {
  // No alterar directamente la variable 'url'
  const formattedUrl = url.startsWith('/') ? url : `/${url}`;
  return request(formattedUrl, params, 'GET', options);
}

function post(url, params, options) {
  return request(url, params, 'POST', options);
}

function postv2(url, params, options) {
  const formattedUrl = url.startsWith('/') ? url : `/${url}`;
  return requestv2(formattedUrl, params, 'POST', options);
}

function update(url, params, options) {
  return request(url, params, 'PUT', options);
}

function remove(url, params, options) {
  return request(url, params, 'DELETE', options);
}

export default {
  get,
  post,
  update,
  remove,
  postv2,
};