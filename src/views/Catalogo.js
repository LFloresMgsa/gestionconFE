import React, { Fragment, useState, useEffect } from 'react';
import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

const StyledView = styled('div')(
  ({ theme }) => css`
    overflow-y: hidden;
  `
);

const Catalogo = (props) => {
  const comprar = () => {
    alert('Yeyyy compraste una laptop!');
  };

  return (
    <div>
      <h1>Catalogo!</h1>
      <button onClick={() => comprar()}>Comprar</button>
    </div>
  );
};

export default Catalogo;
