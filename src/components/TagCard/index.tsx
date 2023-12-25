import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { Tag } from '../../common/types';

const Card = styled(Box)`
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 0 10px 14px 10px;
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
`;

const TagBox = styled(Box)`
  border: 4px solid #fff;
  border-radius: 8px;
  padding: 7px 14px;
  overflow: hidden;
`;

const StyledTypography = styled(Typography)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

interface TagCardProps {
  tag: Tag;
}

function TagCard(props: TagCardProps) {
  const { tag } = props;

  return (
    <Box>
      <Card>
        <TagBox>
          <StyledTypography>{tag.name}</StyledTypography>
        </TagBox>
      </Card>
      <Typography mt="10px" fontSize="14.9px" letterSpacing="0.14px">
        {tag.name}
      </Typography>
      <Typography fontSize="11.175px" letterSpacing="0.373px" color="#B2B2B2">
        {tag.count} Results
      </Typography>
    </Box>
  );
}
export default TagCard;
