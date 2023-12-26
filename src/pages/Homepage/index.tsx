import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';
import PageLayout from '../../components/PageLayout';
import Search from '../../components/Search';
import Results from '../../components/Results';
import Profiles from '../../components/Profiles';

function HomePage() {
  const location = useLocation();

  const [resultsMode, setResultsMode] = useState(false);

  useEffect(() => {
    if (location.search) {
      setResultsMode(true);
    } else {
      setResultsMode(false);
    }
  }, [location.search]);

  return (
    <PageLayout>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="100%"
      >
        <Box flex={1}>{resultsMode ? <Results /> : <Search />}</Box>
        <Profiles />
      </Box>
    </PageLayout>
  );
}

export default HomePage;
