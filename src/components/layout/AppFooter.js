import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { css } from 'styled-components';

const FooterRoot = styled('footer')(
  ({ theme }) => css`
    margin: 0 auto;
    text-align: center;
    width: 32%;
    margin-top: 30px !important;

    & > div:nth-child(1) {
      position: relative;
      display: flex;
      justify-content: space-evenly;
      align-items: end;
      height: 40px;
    }

    small {
      color: #ffffff;
    }

    & .MuiBox-root {
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-box-align: start;
      margin: 7px;
    }

    .MuiDivider-wrapperVertical {
      padding: 0px;
    }

    & > .MuiDivider-root:nth-child(2) {
      margin: 5px auto;
    }

    .MuiButton-textDefault {
      text-transform: capitalize;
      line-height: 10px;
    }

    .legal {
      display: flex;
      font-size: 0.7rem;
      justify-content: space-between;
    }
  `
);

const AppFooter = () => {
  return (
    <FooterRoot>

      <Divider />
      <div >
        <div>Copyright 2024</div>
        <div>.</div>

      </div>
    </FooterRoot>
  );
};

export default AppFooter;
