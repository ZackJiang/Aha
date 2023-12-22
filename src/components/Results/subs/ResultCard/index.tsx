import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const ImageBox = styled(Box)`
  width: 219px;
  height: 146px;
  background: green;
`;

function ResultCard() {
  return (
    <Box>
      <ImageBox />
      <Typography mt="12px" fontSize="14.9px" letterSpacing="0.14px">
        this is a title
      </Typography>
      <Typography fontSize="11.175px" letterSpacing="0.373px" color="#B2B2B2">
        by username
      </Typography>
    </Box>
  );
}

export default ResultCard;
