import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  padding: 0px 20px;

  ${media.small.up`
    width: 100%;
    height: 100vh;
    padding: 92px 48px 0px;
    box-sizing: border-box;
    overflow-y: scroll;
    display: flex;
    justify-content: center;
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
  letter-spacing: 0.25px;

  ${media.small.down`
    font-size: 24px;
    margin-left: 0px;
    letter-spacing: unset;
  `}
`;

const ResultsBox = styled(Box)`
  grid-template-columns: repeat(1, 1fr);
  margin-top: 24px;
  display: grid;
  column-gap: 0px;
  row-gap: 40px;

  ${media.small.up`
    grid-template-columns: repeat(2, 219px);
    column-gap: 34px;
    row-gap: 31px;

    & > :nth-child(n+7) {
      margin-top: 19px;
    }
  `};

  ${media.medium.up`
    grid-template-columns: repeat(3, 219px);
  `};
`;

const StyledArrowBox = styled(Box)`
  cursor: pointer;

  ${media.small.down`
    display: none;
  `}
`;

const StyledSkeleton = styled(Skeleton)`
  width: 219px;
  height: 146px;
  background-color: #121212;

  ${media.small.down`
    width: 100%;
    height: 22.67px;
  `};
`;

function Results() {
  const navigate = useNavigate();
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
          <StyledArrowBox onClick={() => navigate('/')}>
            <Arrow />
          </StyledArrowBox>

          <StyledTypography>Results</StyledTypography>
        </TitleBox>
        <ResultsBox>
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}

          {loading &&
            Array.from({ length: 3 }).map(() => (
              <StyledSkeleton
                variant="rectangular"
                key={uniqueId('skeleton-')}
              />
            ))}
        </ResultsBox>

        {results.length > 0 && page < totalPages && (
          <Box sx={{ marginTop: '39px' }}>
            <Button
              text="More"
              onClick={() => {
                setPage(page + 1);
              }}
            />
          </Box>
        )}

        {results.length === 0 && <Typography>Not found...</Typography>}
      </Box>
    </Container>
  );
}

export default Results;
