import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { Profile } from '../../../../common/types';
import avatarImg from '../../../../assets/dog.jpg';

const ImageBox = styled(Box)`
  background-image: url(${avatarImg});
  background-size: cover;
  background-position: center;
  width: 219px;
  height: 146px;
`;

interface ResultCardProps {
  result: Profile;
}

function ResultCard(props: ResultCardProps) {
  const { result } = props;

  return (
    <Box>
      <ImageBox />
      <Typography mt="12px" fontSize="14.9px" letterSpacing="0.14px">
        {result.name}
      </Typography>
      <Typography fontSize="11.175px" letterSpacing="0.373px" color="#B2B2B2">
        {result.username}
      </Typography>
    </Box>
  );
}

export default ResultCard;
