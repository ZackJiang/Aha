import React from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo';
import MenuIcon from '../../assets/menuIcon';
import PointIcon from '../../assets/pointIcon';

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
  height: 100%;
  background-color: #181818;
`;

const NavBar = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
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
      <div style={{ position: 'relative' }}>
        <StyledMenuIcon
          fill={location.pathname === to ? colors.white : colors.gray}
        />
        {location.pathname !== to && location.pathname === '/' && (
          <div style={{ position: 'absolute', top: -15.5, right: -3.5 }}>
            <PointIcon />
          </div>
        )}
      </div>
      <Box minHeight="18px">
        {location.pathname === to && (
          <Typography color="white" fontSize="12px" letterSpacing="0.4px">
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
  const { children } = props;
  return (
    <StyledBox>
      <NavBar>
        <Box marginTop="37px">
          <Logo />
        </Box>
        <NavLink to={paths.home} text="Home" marginTop="43px" />
        <NavLink to={paths.tags} text="Tags" marginTop="22px" />
      </NavBar>
      {children}
    </StyledBox>
  );
}

export default PageLayout;
