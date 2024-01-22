import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';

import Categorias from './views/Categorias';
import Login from './views/Login';
import Logout from './views/Logout';
import Soporte from './views/Soporte';
import Mantenimiento from './views/Mantenimiento';


const AppRoutes = (props) => {
  const { accessToken, currentUser } = props;
  


  // const plocation = useLocation();

  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const pathIndex = currentUrl.indexOf('path=');
  //   if (pathIndex !== -1) {
  //     const pathValue = currentUrl.substring(pathIndex + 5); // 5 es la longitud de 'path='
  //     setCurrentPage(pathValue);
  //   }

  //   //console.log(plocation.pathname);
  //   //console.log(currentPage);    

  //   if (plocation.pathname !== '/categoria?path=' + currentPage && plocation.pathname != '/categoria' && plocation.pathname !='/' ) {
  //    // window.location.reload();
  //   }

  // }, [plocation]);


  return (
    <Switch>

      <Route exact path="/" render={(route) => <Dashboard {...props} {...route} />}>
        {/* <Redirect to="/inicio" /> */}
      </Route>


      <Route
        path="/categoria"
        render={(route) => <Categorias {...props} {...route} pCategory={""} pTipo="publico" />}

      />


      <Route
        exact
        path="/logout"
        render={(route) => <Logout {...props} {...route} />}
      />

      <Route
        exact
        path="/soporte"
        render={(route) => <Soporte {...props} {...route} />}
      />


      <Route
        exact
        path="/mantenimiento"
        render={(route) => <Soporte {...props} {...route} />}
      />
      <Route
        path="/inicio"
        render={(route) => <Dashboard {...props} {...route} />}
      />
      <Route
        path="/gerencia"
        render={(route) => <Categorias {...props} {...route} pCategory="" pTipo="publico" />}

      />
      <Route
        path="/sistemas"
        render={(route) => <Categorias {...props} {...route} pCategory="" pTipo="seguro" />}
      />
    </Switch>
  );


};

export default AppRoutes;
