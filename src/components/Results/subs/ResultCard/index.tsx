import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { Profile } from '../../../../common/types';
import avatarImg from '../../../../assets/dog.jpg';
import media from '../../../../common/constants';

const ImageBox = styled(Box)`
  background-image: url(${avatarImg});
  background-size: cover;
  background-position: center;
  width: 219px;
  height: 146px;

  ${media.small.down`
    width: 100%;
    height: 222.67px;
  `}
`;

const ResultName = styled(Typography)`
  margin-top: 12px;
  font-size: 14.9px;
  letter-spacing: 0.14px;

  ${media.small.down`
   margin-top:20.33px;
  `}
`;

interface ResultCardProps {
  result: Profile;
}

function ResultCard(props: ResultCardProps) {
  const { result } = props;

  return (
    <Box>
      <ImageBox />
      <ResultName>{result.name}</ResultName>
      <Typography fontSize="11.175px" letterSpacing="0.373px" color="#B2B2B2">
        {result.username}
      </Typography>
    </Box>
  );
}

export default ResultCard;
