import { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import TagCard from '../../components/TagCard';
import PageLayout from '../../components/PageLayout';
import { fetchTags } from '../../api/api';
import { Tag } from '../../common/types';

const Container = styled(Box)<{ isSmallScreen: boolean }>`
  ${(props) =>
    props.isSmallScreen
      ? `
        padding: 0px 20px;
      `
      : `
        width: 100%;
        height: 100vh;
        padding-top: 80px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        overflow-y: scroll;
      `};
`;

const StyledTypography = styled(Typography)<{ isSmallScreen: boolean }>`
  ${(props) =>
    props.isSmallScreen
      ? `
        font-size: 24px;
        margin-top: 20px;
      `
      : `
        font-size: 30px;
        letter-spacing: 0.25px;
      `};
}
`;
const TagsBox = styled(Box)<{ isSmallScreen: boolean }>`
  margin-top: 24px;
  display: grid;
   grid-template-columns: ${(props) =>
     props.isSmallScreen ? 'repeat(2, 1fr)' : 'repeat(5, 150px)'};
  column-gap: 24px;
  row-gap: ${(props) => (props.isSmallScreen ? '24px' : '36px')};
}
`;

function TagsPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
      <Container isSmallScreen={isSmallScreen}>
        <Box>
          <StyledTypography isSmallScreen={isSmallScreen}>
            Tags
          </StyledTypography>

          <TagsBox isSmallScreen={isSmallScreen}>
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
