import React, { Fragment, useState, useEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { videotecaService } from '../services/videoteca.service';

const GalloCSS = styled('div')(
  ({ theme }) => css`
    width:150px;
    background-color:grey;
    height:70px;
  `
);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Catalogo = (props) => {
  
  const [value, setValue] = React.useState(0);
  const [gallos, setGallos] = React.useState([]);

  const obtenerGallos = async () => {
    return await videotecaService.obtenerGAllos().then(
      (res) => {
        console.log(res)
        setGallos(res)
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // llamar api
    obtenerGallos();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* {gallos.map((gallo) => 
          <GalloCSS>
              <img src={gallo.imagen}></img>
              <p>{gallo.nombre}</p>
          </GalloCSS>
        )} */}
      </TabPanel>
      <TabPanel value={value} index={1}>
          <ImageList sx={{ width: 500, height: 450 }}>
            {gallos.map((item, index) => (
              <ImageListItem key={index}>
                <img
                  src={`${item.imagen}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.imagen}?w=248&fit=crop&auto=format&dpr=2 1x`}
                  //alt={item.title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item.nombre}
                 // subtitle={item.author}
                  subtitle="Luis Flores"
                  actionicon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.title}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
            </ImageList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default Catalogo;
