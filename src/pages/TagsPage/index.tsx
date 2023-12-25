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

const Container = styled(Box)`
  width: 100%;
  height: 100vh;
  padding-top: 80px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  overflow-y: scroll;
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
          <Typography fontSize="30px" letterSpacing="0.25px">
            Tags
          </Typography>

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
