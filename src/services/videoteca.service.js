import { store } from '../store';
import { authHeader, handleResponse } from '../helpers';
import Fetch from '../helpers/Fetch';

export const videotecaService = {
  obtenerGAllos,
};

// function obtenerGAllos() {
//   // tu trabajo
//     const options = { headers: authHeader() };
//     const params = {};
//     const url = `localhost:80/tu-end-point/.../${requestID}`;
//     return Fetch.get(url, params, options).then(handleResponse);
// }

function obtenerGAllos() {
  let gallosArray = [
    {nombre: "Edwin", imagen :"https://random.imagecdn.app/500/150"},
    {nombre: "Dany", imagen :"https://random.imagecdn.app/500/150"}
  ]

  const gallos = Promise.resolve(gallosArray);
  return gallos;
}



