import { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import TagCard from '../../components/TagCard';
import PageLayout from '../../components/PageLayout';
import { fetchTags } from '../../api/api';
import { Tag } from '../../common/types';
import media from '../../common/constants';

const Container = styled(Box)`
  ${media.small.up`
    width: 100%;
    height: 100vh;
    padding-top: 80px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    overflow-y: scroll;
  `}
`;

const StyledTypography = styled(Typography)`
  ${media.small.up`
    font-size: 30px;
    letter-spacing: 0.25px;
  `}

  ${media.small.down`
    font-size: 24px;
    margin-top: 20px;
    margin-left: 20px;
  `}
`;
const TagsBox = styled(Box)`
  margin-top: 24px;
  display: grid;
  column-gap: 24px;

  ${media.small.down`
    grid-template-columns: repeat(2, 150px);
    row-gap: 24px;
     padding: 0px 25px;
  `}

  ${media.small.up`
    grid-template-columns: repeat(5, 150px);
    row-gap: 36px;
  `}
`;

function TagsPage() {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const dataTags = await fetchTags();
    setTags(dataTags);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageLayout>
      <Container>
        <Box>
          <StyledTypography>Tags</StyledTypography>

          <TagsBox>
            {tags.map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}

            {loading &&
              Array.from({ length: 20 }).map(() => (
                <Skeleton
                  variant="rectangular"
                  key={uniqueId('skeleton-')}
                  width="150px"
                  height="150px"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    marginBottom: '16px',
                  }}
                />
              ))}
          </TagsBox>
        </Box>
      </Container>
    </PageLayout>
  );
}

export default TagsPage;
