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
import media from '../../common/constants';

const Container = styled(Box)`
  ${media.small.up`
    width: 100%;
    height: 100vh;
    padding-top: 92px;
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
  `}

  ${media.small.down`
    padding: 0px 20px;
  `}
`;

const TitleBox = styled(Box)`
  display: flex;
  align-items: center;

  ${media.small.up`
    margin-left: -44px;
  `}

  ${media.small.down`
    margin-top: 20px;
  `}
`;

const StyledTypography = styled(Typography)`
  font-size: 30px;
  margin-left: 25px;

  ${media.small.down`
    margin-top: 25px;
    margin-left: 0px;
  `}
`;

const ResultsBox = styled(Box)`
  margin-top: 24px;
  display: grid;
  row-gap: 31px;

  ${media.small.down`
    grid-template-columns: repeat(1, 1fr);
    column-gap: 0px;
  `}

  ${media.small.up`
    grid-template-columns: repeat(3, 219px);
    column-gap: 34px;
  `}
`;

const StyledArrowBox = styled(Box)`
  ${media.small.down`
    display: none;
  `}
`;

const StyledSkeleton = styled(Skeleton)`
  width: 219px;
  height: 146px;
  backgroundcolor: #121212;

  ${media.small.down`
    width: 100%;
    height: 22.67px;
  `};
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
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <Container>
      <Box>
        <TitleBox>
          <StyledArrowBox>
            <Arrow />
          </StyledArrowBox>

          <StyledTypography>Results</StyledTypography>
        </TitleBox>
        <ResultsBox>
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}

          {loading &&
            Array.from({ length: 6 }).map(() => (
              <StyledSkeleton
                variant="rectangular"
                key={uniqueId('skeleton-')}
              />
            ))}
        </ResultsBox>

        {results.length && page < totalPages && (
          <Box sx={{ marginTop: '39px' }}>
            <Button
              text="More"
              onClick={() => {
                setPage(page + 1);
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Results;
