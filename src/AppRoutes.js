import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';

import Categorias from './views/Categorias';
import Login from './views/Login';
import Logout from './views/Logout';
import Soporte from './views/Soporte';
import Mantenimiento from './views/Mantenimiento';

const AppRoutes = (props) => {
  const { accessToken, currentUser } = props;

  return (
    <Switch>

      <Route exact path="/" render={(route) => <Dashboard {...props} {...route} />}>
        {/* <Redirect to="/inicio" /> */}
      </Route>


      {/* <Route
        exact
        path="/login"
        render={(route) => <Login {...props} {...route} />}
      /> */}



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
        path="/general"
        render={(route) => <Categorias {...props} {...route} pCategory="general" pTipo="publico" />}

      />
      <Route
        path="/sistemas"
        render={(route) => <Categorias {...props} {...route} pCategory="sistemas" pTipo="seguro" />}
      />
    </Switch>
  );

  // return accessToken.token ? (
  //   <Switch>
  //     <Route
  //       path="/dashboard"
  //       render={(route) => <Dashboard {...props} {...route} />}
  //     />
  //   </Switch>
  // ) : (
  //   !currentUser.detail && (
  //     <Switch>
  //       <Route
  //         path="/login"
  //         render={(route) => <Login {...props} {...route} />}
  //       />
  //     </Switch>
  //   )
  // );
};

export default AppRoutes;
