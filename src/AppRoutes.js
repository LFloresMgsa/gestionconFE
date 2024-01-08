import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './views/Dashboard';
import Catalogo from './views/Catalogo';
import Videoteca from './views/Videoteca';

import { Categorias } from './views/Categorias';
import Login from './views/Login';
import Logout from './views/Logout';


const AppRoutes = (props) => {
  const { accessToken, currentUser } = props;

  return (
    <Switch>

      <Route
        exact
        path="/login"
        render={(route) => <Login {...props} {...route} />}
      />


      <Route
        exact
        path="/logout"
        render={(route) => <Logout {...props} {...route} />}
      />

      <Route
        path="/inicio"
        render={(route) => <Dashboard {...props} {...route} />}
      />
      <Route
        path="/general"
        render={(route) => <Categorias {...props} {...route} pCategory="category1" />}

      />
      <Route
        path="/sistemas"
        render={(route) => <Categorias {...props} {...route} pCategory="category2" />}
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
