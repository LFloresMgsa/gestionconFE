import React, { Fragment, useState, useEffect } from 'react';

import { css, useTheme } from 'styled-components';
import { styled } from '@mui/material/styles';

const StyledView = styled('div')(
  ({ theme }) => css`
    overflow-y: hidden;
  `
);

const Dashboard = (props) => {
  return (
    <div>
      <h1>Bienvenidos!</h1>
    </div>
  );
};

export default Dashboard;
