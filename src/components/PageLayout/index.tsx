import React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Logo from '../../assets/logo';
import MenuIcon from '../../assets/menuIcon';
import PointIcon from '../../assets/pointIcon';
import Arrow from '../../assets/arrow';
import media from '../../common/constants';

const colors = {
  white: '#FFFFFF',
  gray: '#6A6A6A',
};

const paths = {
  home: '/',
  tags: '/tags',
};

const StyledBox = styled(Box)`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-cotent: space-between;
  flex-direction: row;

  ${media.small.down`
    flex-direction: column;
  `}
`;

const BottomMenu = styled(Box)`
  height: 66px;
  width: 100%;
  background-color: #1b1b1b;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBar = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  height: 100vh;
  background-color: #1b1b1b;
`;

const StyledMenuIcon = styled(MenuIcon)`
  fill: ${(props) => props.fill || colors.white};
  cursor: pointer;
`;

interface NavLinkProps {
  to: string;
  text: string;
  marginTop: string;
}

function NavLink(props: NavLinkProps) {
  const { to, text, marginTop } = props;
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      marginTop={marginTop}
      display="flex"
      flexDirection="column"
      alignItems="center"
      onClick={() => navigate(to)}
    >
      <Box style={{ position: 'relative' }} maxWidth="24px" maxHeight="24px">
        <StyledMenuIcon
          fill={location.pathname === to ? colors.white : colors.gray}
        />
        {location.pathname !== to && location.pathname === '/' && (
          <div style={{ position: 'absolute', top: -15.5, right: -3.5 }}>
            <PointIcon />
          </div>
        )}
      </Box>
      <Box minHeight="18px">
        {location.pathname === to && (
          <Typography fontSize="12px" letterSpacing="0.4px">
            {text}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout(props: PageLayoutProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <StyledBox>
      {isSmallScreen ? (
        <>
          {location.pathname === paths.home && !location.search ? (
            <Box height="70px" marginTop="28px" marginLeft="21px">
              <Logo />
            </Box>
          ) : (
            <Box
              height="70px"
              marginTop="17px"
              marginLeft="19px"
              display="flex"
              alignItems="center"
            >
              <Box
                width="26px"
                height="26px"
                onClick={() => navigate(paths.home)}
              >
                <Arrow />
              </Box>
              <Typography ml="10px" fontSize="24px">
                Home page
              </Typography>
            </Box>
          )}
          <Box flex={1}>{children}</Box>
          {location.pathname === paths.home && !location.search && (
            <BottomMenu>
              <StyledMenuIcon
                fill={colors.white}
                onClick={() => handleMenuClick(paths.home)}
              />
              <StyledMenuIcon
                fill={colors.gray}
                sx={{ marginLeft: '50px' }}
                onClick={() => handleMenuClick(paths.tags)}
              />
            </BottomMenu>
          )}
        </>
      ) : (
        <>
          <NavBar>
            <Box maxWidth="35px" maxHeight="15px" marginTop="37px">
              <Logo />
            </Box>
            <NavLink to={paths.home} text="Home" marginTop="43px" />
            <NavLink to={paths.tags} text="Tags" marginTop="22px" />
          </NavBar>
          <Box flex={1}>{children}</Box>
        </>
      )}
    </StyledBox>
  );
}

export default PageLayout;
