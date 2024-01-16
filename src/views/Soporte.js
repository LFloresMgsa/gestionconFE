//Soporte.js
import React from 'react';
import { Container, CssBaseline, Box, Typography } from '@mui/material';
import fondo from '../imagenes/soporte.png';

const Soporte = (props) => {
  // ... lógica del componente ...

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <CssBaseline />
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={fondo} alt="" style={{ width: '150%', opacity: 0.7 }} />
        {/* Agrega cualquier otra lógica o contenido aquí */}
        <Typography component="div" variant="body1">
          {/* Contenido adicional si es necesario */}
        </Typography>
      </Box>
    </Container>
  );
};

export default Soporte;
