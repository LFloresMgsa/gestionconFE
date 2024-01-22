import React, { Fragment, useState, useEffect, Component } from 'react';
import { LoadFiles } from './LoadFiles';
import fondo from '../imagenes/fondotodos.png';
import { eventoService } from '../services/evento.service';

import Cookies from 'universal-cookie';
const cookies = new Cookies();



class Categorias extends Component {

  componentDidMount() {

    //---------------------------------
    // Obtén la cadena de consulta de la URL
    const queryString = window.location.search;

    // Parsea la cadena de consulta para obtener los parámetros
    const urlParams = new URLSearchParams(queryString);

    // Obtiene el valor del parámetro 'path'
    const security = urlParams.get('path');
    console.log("Valor de security: ", security);
    //---------------------------------


    // const json = [
    //   {
    //     "id": "root",
    //     "index": 1,
    //     "tabID": 2,
    //     "portalID": 9,
    //     "tabName": "Inicio",
    //     "title": "",
    //     "description": "",
    //     "parentId": -1,
    //     "level": 0,
    //     "authorizedRoles": "65;68;-3;",
    //     "authorizedRolesAllString": " Root, All, Users, Admin ",
    //     "administratorRoles": "65;",
    //     "tabOrder": 1,
    //     "isVisible": true,
    //     "componentName": "",
    //     "routeName": "inicio",
    //     "isDisabled": false,
    //     "isDeleted": false,
    //     "wasUpdated": false,
    //     "security": false,
    //     "path": "",
    //     "tabChildren": [
    //       {
    //         "id": "2",
    //         "index": 2,
    //         "tabID": 3,
    //         "portalID": 9,
    //         "tabName": "Categoria",
    //         "title": "",
    //         "description": "",
    //         "parentId": 1,
    //         "level": 0,
    //         "authorizedRoles": "65;68;-3;",
    //         "authorizedRolesAllString": " Root, All, Users, Admin ",
    //         "administratorRoles": "65;",
    //         "tabOrder": 2,
    //         "isVisible": true,
    //         "componentName": "",
    //         "routeName": "categoria",
    //         "isDisabled": false,
    //         "isDeleted": false,
    //         "wasUpdated": false,
    //         "security": false,
    //         "path": "categoria",
    //         "tabChildren": [
    //           {
    //             "id": "3",
    //             "index": 3,
    //             "tabID": 4,
    //             "portalID": 9,
    //             "tabName": "contabilidad",
    //             "title": "",
    //             "description": "",
    //             "parentId": 3,
    //             "level": 1,
    //             "authorizedRoles": "65;68;-3;",
    //             "authorizedRolesAllString": " Root, All, Users, Admin ",
    //             "administratorRoles": "65;",
    //             "tabOrder": 1,
    //             "isVisible": true,
    //             "componentName": "",
    //             "routeName": "categoria?path=contabilidad",
    //             "isDisabled": false,
    //             "isDeleted": false,
    //             "wasUpdated": false,
    //             "security": false,
    //             "path": "contabilidad",
    //             "tabChildren": [
    //               {
    //                 "id": "4",
    //                 "index": 4,
    //                 "tabID": 5,
    //                 "portalID": 9,
    //                 "tabName": "documentos",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 4,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root, All, Users, Admin ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 1,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=contabilidad\\documentos",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": false,
    //                 "path": "contabilidad\\documentos",
    //                 "tabChildren": []
    //               },
    //               {
    //                 "id": "5",
    //                 "index": 5,
    //                 "tabID": 6,
    //                 "portalID": 9,
    //                 "tabName": "videos",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 4,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root, All, Users, Admin ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 2,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=contabilidad\\videos",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": false,
    //                 "path": "contabilidad\\videos",
    //                 "tabChildren": [
    //                   {
    //                     "id": "6",
    //                     "index": 6,
    //                     "tabID": 7,
    //                     "portalID": 9,
    //                     "tabName": "introduccion",
    //                     "title": "",
    //                     "description": "",
    //                     "parentId": 6,
    //                     "level": 3,
    //                     "authorizedRoles": "65;68;-3;",
    //                     "authorizedRolesAllString": " Root, All, Users, Admin ",
    //                     "administratorRoles": "65;",
    //                     "tabOrder": 1,
    //                     "isVisible": true,
    //                     "componentName": "",
    //                     "routeName": "categoria?path=contabilidad\\videos\\introduccion",
    //                     "isDisabled": false,
    //                     "isDeleted": false,
    //                     "wasUpdated": false,
    //                     "security": false,
    //                     "path": "contabilidad\\videos\\introduccion",
    //                     "tabChildren": []
    //                   },
    //                   {
    //                     "id": "7",
    //                     "index": 7,
    //                     "tabID": 8,
    //                     "portalID": 9,
    //                     "tabName": "modulos",
    //                     "title": "",
    //                     "description": "",
    //                     "parentId": 6,
    //                     "level": 3,
    //                     "authorizedRoles": "65;68;-3;",
    //                     "authorizedRolesAllString": " Root, All, Users, Admin ",
    //                     "administratorRoles": "65;",
    //                     "tabOrder": 2,
    //                     "isVisible": true,
    //                     "componentName": "",
    //                     "routeName": "categoria?path=contabilidad\\videos\\modulos",
    //                     "isDisabled": false,
    //                     "isDeleted": false,
    //                     "wasUpdated": false,
    //                     "security": false,
    //                     "path": "contabilidad\\videos\\modulos",
    //                     "tabChildren": []
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "id": "8",
    //             "index": 8,
    //             "tabID": 9,
    //             "portalID": 9,
    //             "tabName": "gerencia",
    //             "title": "",
    //             "description": "",
    //             "parentId": 3,
    //             "level": 1,
    //             "authorizedRoles": "65;68;-3;",
    //             "authorizedRolesAllString": " Root, Admin ",
    //             "administratorRoles": "65;",
    //             "tabOrder": 2,
    //             "isVisible": true,
    //             "componentName": "",
    //             "routeName": "categoria?path=gerencia",
    //             "isDisabled": false,
    //             "isDeleted": false,
    //             "wasUpdated": false,
    //             "security": true,
    //             "path": "gerencia",
    //             "tabChildren": []
    //           },
    //           {
    //             "id": "9",
    //             "index": 9,
    //             "tabID": 10,
    //             "portalID": 9,
    //             "tabName": "sistemas",
    //             "title": "",
    //             "description": "",
    //             "parentId": 3,
    //             "level": 1,
    //             "authorizedRoles": "65;68;-3;",
    //             "authorizedRolesAllString": " Root ",
    //             "administratorRoles": "65;",
    //             "tabOrder": 3,
    //             "isVisible": true,
    //             "componentName": "",
    //             "routeName": "categoria?path=sistemas",
    //             "isDisabled": false,
    //             "isDeleted": false,
    //             "wasUpdated": false,
    //             "security": true,
    //             "path": "sistemas",
    //             "tabChildren": [
    //               {
    //                 "id": "10",
    //                 "index": 10,
    //                 "tabID": 11,
    //                 "portalID": 9,
    //                 "tabName": "CAMBIO_DE_IP_PUBLICO",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 10,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 1,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=sistemas\\cambio_de_ip_publico",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": true,
    //                 "path": "sistemas\\cambio_de_ip_publico",
    //                 "tabChildren": []
    //               },
    //               {
    //                 "id": "11",
    //                 "index": 11,
    //                 "tabID": 12,
    //                 "portalID": 9,
    //                 "tabName": "CREACION_DE_DOMINIO",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 10,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 2,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=sistemas\\creacion_de_dominio",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": true,
    //                 "path": "sistemas\\creacion_de_dominio",
    //                 "tabChildren": []
    //               },
    //               {
    //                 "id": "12",
    //                 "index": 12,
    //                 "tabID": 13,
    //                 "portalID": 9,
    //                 "tabName": "CREACION_DE_USUARIO_MIKROTIK_VPN",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 10,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 3,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=sistemas\\creacion_de_usuario_mikrotik_vpn",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": true,
    //                 "path": "sistemas\\creacion_de_usuario_mikrotik_vpn",
    //                 "tabChildren": []
    //               },
    //               {
    //                 "id": "13",
    //                 "index": 13,
    //                 "tabID": 14,
    //                 "portalID": 9,
    //                 "tabName": "CREACION_DE_USUARIO_REMOTO",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 10,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 4,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=sistemas\\creacion_de_usuario_remoto",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": true,
    //                 "path": "sistemas\\creacion_de_usuario_remoto",
    //                 "tabChildren": []
    //               },
    //               {
    //                 "id": "14",
    //                 "index": 14,
    //                 "tabID": 15,
    //                 "portalID": 9,
    //                 "tabName": "DISENIO_DE_PROYECTOS_DE_LA_EMPRESA",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 10,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 5,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=sistemas\\disenio_de_proyectos_de_la_empresa",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": true,
    //                 "path": "sistemas\\disenio_de_proyectos_de_la_empresa",
    //                 "tabChildren": []
    //               },
    //               {
    //                 "id": "15",
    //                 "index": 15,
    //                 "tabID": 16,
    //                 "portalID": 9,
    //                 "tabName": "INICIO_DE_SERVIDORES",
    //                 "title": "",
    //                 "description": "",
    //                 "parentId": 10,
    //                 "level": 2,
    //                 "authorizedRoles": "65;68;-3;",
    //                 "authorizedRolesAllString": " Root ",
    //                 "administratorRoles": "65;",
    //                 "tabOrder": 6,
    //                 "isVisible": true,
    //                 "componentName": "",
    //                 "routeName": "categoria?path=sistemas\\inicio_de_servidores",
    //                 "isDisabled": false,
    //                 "isDeleted": false,
    //                 "wasUpdated": false,
    //                 "security": true,
    //                 "path": "sistemas\\inicio_de_servidores",
    //                 "tabChildren": []
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ];

    this.buscaValor(security).then(_valor => {

      if (!cookies.get('Sgm_cUsuario')) {

        console.log(_valor );

        if (_valor == true) {

          //console.log("entro redireccionamiento");
          window.location.href = "./inicio";
        }

      }

      // Puedes hacer más cosas con los datos aquí si es necesario
    }).catch(error => {
      console.error('Error en la solicitud a la API:', error);
    });

    //---------------------------------
  };

  buscaValor = async (parametro) => {

    let _valor = false;

    //const [_directorio, setDatos] = useState([]);

    try {
      const _directorio = await eventoService.obtenerDirectorios();

      _valor = await this.buscarSecurityPorParametro(_directorio, parametro);

      //  setDatos(directorio);
      console.log('valor de _valor encontrado : ', _valor);

    } catch (error) {
      console.error('Error al cargar datos:', error);
    }

    return _valor;
    //return buscarSecurityPorParametro(_directorio, parametro)
  }

  buscarSecurityPorParametro = async (json, parametro) => {
    // Función recursiva para buscar en el JSON
    const buscarEnJSON = (json, parametro) => {
      for (let i = 0; i < json.length; i++) {
        const elemento = json[i];

        // Verificar si el parámetro coincide con el campo "path"
        if (elemento.path === parametro) {
          return elemento.security;
        }

        // Si hay hijos, buscar recursivamente en ellos
        if (elemento.tabChildren && elemento.tabChildren.length > 0) {
          const resultadoHijo = buscarEnJSON(elemento.tabChildren, parametro);
          if (resultadoHijo !== null) {
            return resultadoHijo;
          }
        }
      }

      // Si no se encuentra el parámetro, retornar null
      return null;
    };
    // Llamar a la función recursiva con el JSON y el parámetro
    return buscarEnJSON(json, parametro);
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
