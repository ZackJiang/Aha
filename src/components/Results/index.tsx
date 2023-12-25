import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import { uniqueId } from 'lodash';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Arrow from '../../assets/arrow';
import ResultCard from './subs/ResultCard';
import Button from '../Button';
import { searchProfiles } from '../../api/api';
import { Profile } from '../../common/types';

const Container = styled(Box)`
  padding-top: 92px;
`;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;
  padding-left: 87px;
`;

const ResultsBox = styled(Box)`
  margin-top: 24px;
  padding-left: 131px;
  display: grid;
  grid-template-columns: repeat(3, 219px);
  column-gap: 34px;
  row-gap: 31px; 
}
`;

function Results() {
  const [results, setResults] = useState<Profile[]>([]);
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    const searchParams = new URLSearchParams(location.search);
    const urlKeyword = searchParams.get('keyword');
    const urlPageSize = searchParams.get('pageSize');
    if (urlKeyword && urlPageSize) {
      setLoading(true);
      const { totalPages: dataTotalPages, profiles: dataProfiles } =
        await searchProfiles(page, parseInt(urlPageSize, 10), urlKeyword);
      setResults([...results, ...dataProfiles]);
      setTotalPages(dataTotalPages);
      setLoading(false);
      console.warn(page);
      console.warn(dataTotalPages);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <Container>
      <TitleBox>
        <Arrow />
        <Typography ml="25px">Results</Typography>
      </TitleBox>
      <ResultsBox>
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}

        {loading &&
          Array.from({ length: 6 }).map(() => (
            <Skeleton
              variant="rectangular"
              key={uniqueId('skeleton-')}
              width="219px"
              height="146px"
              style={{ backgroundColor: '#121212' }}
            />
          ))}
      </ResultsBox>

      {results.length && page < totalPages && (
        <Box sx={{ paddingLeft: '131px;', marginTop: '39px' }}>
          <Button
            text="More"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </Box>
      )}
    </Container>
  );
}

export default Results;
