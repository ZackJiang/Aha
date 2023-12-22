import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Arrow from '../../assets/arrow';
import ResultCard from './subs/ResultCard';
import Button from '../Button';

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
  return (
    <Container>
      <TitleBox>
        <Arrow />
        <Typography ml="25px">Results</Typography>
      </TitleBox>
      <ResultsBox>
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </ResultsBox>
      <Box sx={{ paddingLeft: '131px;', marginTop: '39px' }}>
        <Button text="Search" />
      </Box>
    </Container>
  );
}

export default Results;
