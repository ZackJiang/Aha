import { useState } from 'react';
import Box from '@mui/material/Box';
import PageLayout from '../../components/PageLayout';
import Search from '../../components/Search';
import Results from '../../components/Results';
import Profiles from '../../components/Profiles';

function HomePage() {
  const [results] = useState(['test']);

  return (
    <PageLayout>
      <Box display="flex" justifyContent="space-between">
        {results.length ? <Results /> : <Search />}
        <Profiles />
      </Box>
    </PageLayout>
  );
}

export default HomePage;
