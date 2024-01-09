import React from 'react';

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
      color: #5e6c79;
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
      <div>
        <Box>
          <div>
            {localize === 'English' ? (
              <img src={Usa} alt="US" />
            ) : (
              <img src={Spain} alt="ES" />
            )}
          </div>
          <ButtonGroup size="small" variant="text">
            {languageButtons}
          </ButtonGroup>
        </Box>
        {/* <Divider orientation="vertical" flexItem></Divider> */}
        <Box>
          <div>
            {theme.palette.mode === 'dark' ? (
              <DarkModeOutlinedIcon fontSize="small" color="secondary" />
            ) : (
              <LightModeOutlinedIcon fontSize="small" color="warning" />
            )}
          </div>
          <ButtonGroup size="small" variant="text">
            {themeButtons}
          </ButtonGroup>
        </Box>
      </div>
      <Divider />
      <div>
        <strong>Help &nbsp;&nbsp; | &nbsp;&nbsp; </strong>
        <strong>Terms &nbsp;&nbsp; | &nbsp;&nbsp; </strong>
        <strong>Privacy</strong>
      </div>

    </FooterRoot>
  );
};

export default AppFooter;
