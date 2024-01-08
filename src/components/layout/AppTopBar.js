import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import MeNavBarDisplay from '../common/others/MeNavBarDisplay';
import { useDispatch } from 'react-redux';
import { store } from '../../store';

const AppTopBar = (props) => {
  const dispatch = useDispatch();
  const { global, menuState } = store.getState();

  return (
    <AppBar color="inherit" position="fixed">
      <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
        <div className="toolbar-left">
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() =>
                dispatch({
                  type: 'SET_MENU_STATE',
                  payload:
                    menuState.current === 'expanded' ? 'icons' : 'expanded',
                })
              }
              size="large"
            >
              <MenuIcon />
            </IconButton>
            {menuState.current === 'icons' && <span>{global.portalName}</span>}
          </div>
        </div>
        <div className="toolbar-right">
          <MeNavBarDisplay setTheme={(event) => props.setter(event)} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppTopBar;
