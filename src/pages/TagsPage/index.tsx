import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import TagCard from '../../components/TagCard';
import PageLayout from '../../components/PageLayout';

const Container = styled(Box)`
  width: 100%;
  padding-top: 80px;
  display: flex;
  justify-content: center;
`;

const TagsBox = styled(Box)`
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  column-gap: 24px;
  row-gap: 36px; 
}
`;

function TagsPage() {
  return (
    <PageLayout>
      <Container>
        <Box>
          <Typography fontSize="30px" letterSpacing="0.25px">
            Tags
          </Typography>

          <TagsBox>
            <TagCard />
            <TagCard />
            <TagCard />
            <TagCard />
            <TagCard />
            <TagCard />
            <TagCard />
            <TagCard />
          </TagsBox>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default TagsPage;
