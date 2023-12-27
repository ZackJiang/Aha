import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

const Container = styled(Box)<{ isSmallScreen: boolean }>`
  ${(props) =>
    props.isSmallScreen
      ? `
        padding: 0px 20px;
      `
      : `
        width: 100%;
        height: 100vh;
        padding-top: 92px;
        box-sizing: border-box;
        overflow-y: scroll;
        display: flex;
        justify-content: center;
      `};
`;

const TitleBox = styled(Box)<{ isSmallScreen: boolean }>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => (props.isSmallScreen ? 'unset' : '-44px')};
  margin-top: ${(props) => (props.isSmallScreen ? '20px' : 'unset')};
`;

const StyledTypography = styled(Typography)<{ isSmallScreen: boolean }>`
  ${(props) =>
    props.isSmallScreen
      ? `
        font-size: 24px;
      `
      : `
        font-size: 30px;
        margin-left: 25px;
      `};
}
`;

const ResultsBox = styled(Box)<{ isSmallScreen: boolean }>`
  margin-top: 24px;
  display: grid;
  grid-template-columns: ${(props) =>
    props.isSmallScreen ? 'repeat(1, 1fr)' : 'repeat(3, 219px)'};
  column-gap: ${(props) => (props.isSmallScreen ? '0px' : '34px')};
  row-gap: 31px; 
}
`;

function Results() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
    <Container isSmallScreen={isSmallScreen}>
      <Box>
        <TitleBox isSmallScreen={isSmallScreen}>
          {!isSmallScreen && <Arrow />}

          <StyledTypography isSmallScreen={isSmallScreen}>
            Results
          </StyledTypography>
        </TitleBox>
        <ResultsBox isSmallScreen={isSmallScreen}>
          {results.map((result) => (
            <ResultCard
              key={result.id}
              result={result}
              isMobileView={isSmallScreen}
            />
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
          <Box sx={{ marginTop: '39px' }}>
            <Button
              text="More"
              onClick={() => {
                setPage(page + 1);
              }}
              width={isSmallScreen ? '100%' : '343px'}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default Results;
