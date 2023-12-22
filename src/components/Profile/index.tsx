import React, { useState } from 'react';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProfileCard from './subs/ProfileCard';

const ProfileBox = styled(Box)`
  width: 375px;
  height: 100%;
  background-color: #1b1b1b;

  position: fixed;
  right: 0px;
`;

const StyledTabs = styled(Tabs)`
  &.MuiTabs-root {
    min-height: 0;
  }

  .MuiTab-root {
    width: 50%;
    padding: 0;
    min-height: 0;
    padding-bottom: 13px;
  }

  .MuiTabs-indicator {
    background-color: #fff;
  }
`;

const StyledTab = styled(Tab)`
  color: #929292;
  text-transform: capitalize;

  &.Mui-selected {
    color: #fff;
  }
`;

const StyledTabPanel = styled(Box)`
  width: 100%;
`;

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { value, index } = props;

  return (
    <StyledTabPanel display={value !== index ? 'none' : 'block'}>
      <ProfileCard />
    </StyledTabPanel>
  );
}

function Profile() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ProfileBox>
      <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <StyledTab label="Followers" {...a11yProps(0)} />
          <StyledTab label="Followings" {...a11yProps(1)} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0} />

      {/* <CustomTabPanel value={value} index={1} /> */}
    </ProfileBox>
  );
}

export default Profile;
