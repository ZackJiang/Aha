import React, { useState, useEffect, useRef } from 'react';
import { uniqueId } from 'lodash';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';
import ProfileCard from './subs/ProfileCard';
import { fetchProfiles } from '../../api/api';
import { Profile } from '../../common/types';

const pageSize = 20;

const ProfilesBox = styled(Box)`
  width: 375px;
  height: 100vh;
  background-color: #1b1b1b;
  overflow: hidden;

  ${() => css`
    @media (max-width: 1439px) {
      display: none;
    }
  `}
`;

const StyledTabs = styled(Tabs)`
  &.MuiTabs-root {
    min-height: 0;
  }

  .MuiTab-root {
    width: 50%;
    padding: 0;
    min-height: 0;
    padding-bottom: 10px;
  }

  .MuiTabs-indicator {
    background-color: #fff;
  }
`;

const StyledTab = styled(Tab)`
  color: #929292;
  text-transform: capitalize;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  &.Mui-selected {
    color: #fff;
  }
`;

const StyledTabPanel = styled(Box)`
  width: 100%;
  padding: 0px 16px 32px;
  box-sizing: border-box;
  overflow-y: scroll;
  height: 100%;
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
  isFollowingMode: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { value, index, isFollowingMode } = props;
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const { totalPages: dataPages, profiles: dataProfiles } =
      await fetchProfiles(page, pageSize, isFollowingMode);
    setProfiles([...profiles, ...dataProfiles]);
    setTotalPages(dataPages);
    setLoading(false);
  };

  const handleScroll = () => {
    if (!contentRef.current) return;

    const contentElem = contentRef.current;
    const { scrollTop, clientHeight, scrollHeight } = contentElem;

    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !loading &&
      page < totalPages
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const contentElem = contentRef.current;
    if (contentElem) {
      contentElem.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (contentElem) {
        contentElem.removeEventListener('scroll', handleScroll);
      }
    };
  }, [page, loading]);

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <StyledTabPanel
      ref={contentRef}
      display={value !== index ? 'none' : 'block'}
    >
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}

      {loading &&
        Array.from({ length: pageSize }).map(() => (
          <Skeleton
            variant="rectangular"
            key={uniqueId('skeleton-')}
            width="100%"
            height="45px"
            style={{ backgroundColor: '#121212', marginBottom: '16px' }}
          />
        ))}
    </StyledTabPanel>
  );
}

function Profiles() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ProfilesBox>
      <Box sx={{ marginTop: '32px', marginBottom: '32px' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
        >
          <StyledTab label="Followers" {...a11yProps(0)} />
          <StyledTab label="Following" {...a11yProps(1)} />
        </StyledTabs>
      </Box>
      <TabPanel value={value} index={0} isFollowingMode={false} />
      <TabPanel value={value} index={1} isFollowingMode />
    </ProfilesBox>
  );
}

export default Profiles;
