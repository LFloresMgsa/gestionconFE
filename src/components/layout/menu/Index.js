import React, { Fragment } from 'react';
import MenuItems from './MenuItems';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import logoImage from '../../../imagenes/mgsa.jpg'
import { Avatar, Chip, Drawer } from '@mui/material';
import { useDispatch } from 'react-redux';

import Cookies from 'universal-cookie';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  logo: {
    width: '210px',
    margin: '0 15px',
    borderBottom: '0px solid #dcdcdc', // Añade un borde inferior a la imagen
  },
});




const cookies = new Cookies();


const StyledMenu = styled(Drawer)(
  ({ theme, viewport, state }) => css`
    display: ${['expanded', 'icons'].includes(state.current)
      ? 'block'
      : 'none'};
    width: ${state.width};
    position: sticky;
    top: 50px;
    border-top: 10;

    .MuiPaper-root {
      border-top: 0;
      width: ${state.width};
      margin-top: ${['xs', 'sm'].includes(viewport) ? '0px' : '50px'};
      justify-content: space-between;
      background-color: white;
    }

    #menu-dev-info {
      text-align: center;
      color:white;
    }

    #logo-and-timer {
      height: 150px;

      .portalLogo {
        img {
          max-width: 200px;
          display: block;
          margin: auto;
        }
      }

      .appTimer {
        display: flex;
        justify-content: center;

        div:first-child {
          color: brown;
          font-weight: 600;
          padding-right: 10px;
        }
      }
    }
  `
);

// Menu states are "expanded  | icons | hidden"

const _temp_tabs = [
  {
    index: 1, // ***
    tabID: 1, // ***
    portalID: 9,
    tabName: 'Inicio', // ***
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;-1;',
    authorizedRolesAllString: ' Root, All, Users , Admin',
    administratorRoles: '65;',
    tabOrder: 1,
    isVisible: true,
    componentName: '',
    routeName: 'inicio', // ***
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },

  {
    index: 2,
    tabID: 2,
    portalID: 9,
    tabName: 'Categoria',
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;68;-3;',
    authorizedRolesAllString: ' Root, All, Users, Admin ',
    administratorRoles: '65;',
    tabOrder: 2,
    isVisible: true,
    componentName: '',
    routeName: 'categoria',
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [
      {
        index: 3,
        tabID: 3,
        portalID: 9,
        tabName: 'General',
        title: '',
        description: '',
        parentId: 4,
        level: 1,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, All, Users, Admin ',
        administratorRoles: '65;',
        tabOrder: 3,
        isVisible: true,
        componentName: '',
        routeName: 'general',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },
      {
        index: 4,
        tabID: 4,
        portalID: 9,
        tabName: 'Sistemas',
        title: '',
        description: '',
        parentId: 4,
        level: 1,
        authorizedRoles: '65;68;-3;',
        authorizedRolesAllString: ' Root, Admin ',
        administratorRoles: '65;',
        tabOrder: 4,
        isVisible: true,
        componentName: '',
        routeName: 'sistemas',
        isDisabled: false,
        isDeleted: false,
        wasUpdated: false,
        tabChildren: [],
      },


    ],

  },
  {
    index: 5, // ***
    tabID: 5, // ***
    portalID: 9,
    tabName: 'Soporte', // ***
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;-1;',
    authorizedRolesAllString: ' Root, All, Users, Admin ',
    administratorRoles: '65;',
    tabOrder: 5,
    isVisible: true,
    componentName: '',
    routeName: 'soporte', // ***
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
  {
    index: 6, // ***
    tabID: 6, // ***
    portalID: 9,
    tabName: 'Mantenimientos', // ***
    title: '',
    description: '',
    parentId: -1,
    level: 0,
    authorizedRoles: '65;-1;',
    authorizedRolesAllString: ' Root, Admin ',
    administratorRoles: '65;',
    tabOrder: 6,
    isVisible: true,
    componentName: '',
    routeName: 'mantenimientos', // ***
    isDisabled: false,
    isDeleted: false,
    wasUpdated: false,
    tabChildren: [],
  },
];


const Menu = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { viewport, state, global } = props;

  const classes = useStyles();

  let tabs = _temp_tabs
    .map(item => {
      const subarrayFiltrado = item.tabChildren.filter(subitem => subitem.authorizedRolesAllString.indexOf("All") > 0);
      return { ...item, tabChildren: subarrayFiltrado };
    })
    .filter(_temp_tabs => _temp_tabs.authorizedRolesAllString.indexOf("All") > 0);



  if (cookies.get('Sgm_cUsuario') != "" && cookies.get('Sgm_cUsuario') != null) {

    tabs = _temp_tabs
      .map(item => {
        const subarrayFiltrado = item.tabChildren.filter(subitem => subitem.authorizedRolesAllString.indexOf(cookies.get('Sgm_cPerfil')) > 0);
        return { ...item, tabChildren: subarrayFiltrado };
      })
      .filter(_temp_tabs => _temp_tabs.authorizedRolesAllString.indexOf(cookies.get('Sgm_cPerfil')) > 0);
  }

  const sortMenuItems = tabs.sort((a, b) => (a.tabOrder > b.tabOrder ? 1 : -1));

  const drawerContent = (
    <Fragment>
    <div id="menu-tabs">
      <div>.</div>
      <MenuItems
        viewport={viewport}
        menuState={state}
        items={sortMenuItems}
      />
    </div>

    {/* Contenedor flex para centrar verticalmente */}
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', top: '-45px' }}>
      {/* Agrega la imagen debajo del menú */}
      <div id="menu-image">
        <img src={logoImage} alt="Logo" className={classes.logo} />
      </div>
    </div>
  </Fragment>
  );
  
  const container = !window ? () => window().document.body : undefined;

  return (
    <>
      <StyledMenu
        state={state}
        viewport={viewport}
        container={container}
        variant="temporary"
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={state.current === 'expanded' ? true : false}
        onClose={() =>
          dispatch({
            type: 'SET_MENU_STATE',
            payload: 'hidden',
          })
        }
        ModalProps={{ keepMounted: true }}
        sx={{ display: { sm: 'block', md: 'none' } }}
      >
        {drawerContent}



      </StyledMenu>



      <StyledMenu
        state={state}
        viewport={viewport}
        variant="permanent"
        open={state.current === 'expanded' ? true : false}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawerContent}

      </StyledMenu>


    </>
  );
};

export default Menu;
