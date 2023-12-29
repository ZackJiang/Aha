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
  padding: 3px 10px;
  overflow: hidden;
  box-sizing: border-box;
`;

const StyledTypography = styled(Typography)`
  font-size: 24px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const StyledTagName = styled(Typography)`
  margin-top: 10px;
  font-size: 14.9px;
  letter-spacing: 0.14px;
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
      <StyledTagName>{tag.name}</StyledTagName>
      <Typography fontSize="11.175px" letterSpacing="0.373px" color="#B2B2B2">
        {tag.count} Results
      </Typography>
    </Box>
  );
}
export default TagCard;
