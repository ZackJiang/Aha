import { useState } from 'react';
import PageLayout from '../../components/PageLayout';
import Search from '../../components/Search';
import Results from '../../components/Results';
import Profile from '../../components/Profile';

function HomePage() {
  const [results] = useState(['test']);

  return (
    <PageLayout>
      {results.length ? <Results /> : <Search />}
      <Profile />
    </PageLayout>
  );
}

export default HomePage;
