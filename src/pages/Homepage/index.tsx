import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import PageLayout from '../../components/PageLayout';
import Slider from '../../components/Slider';
import Button from '../../components/Button';
import Profile from '../../components/Profile';

const SearchBox = styled(Box)`
  padding-top: 54px;
  padding-left: 130px;
`;

const StyledTextField = styled(TextField)`
  margin-top: 20px;
  &.MuiTextField-root {
    width: 725px;
    height: 60px;

    & .MuiOutlinedInput-root {
      fieldset {
        border-radius: 6px;
        border: 3px solid rgba(255, 255, 255, 0.5);
      }

      &.Mui-focused fieldset {
        border-color: #ff9b33;
      }
    }

    & .MuiOutlinedInput-input {
      color: white;
      padding: 20px 18px;
    }
  }
`;

function HomePage() {
  return (
    <PageLayout>
      <SearchBox>
        <Typography fontSize="24px">Search</Typography>
        <StyledTextField
          variant="outlined"
          InputProps={{
            placeholder: 'Keyword',
          }}
        />
        <Divider
          sx={{
            marginTop: '30px',
            marginBottom: '30px',
            background: 'white',
            opacity: 0.1,
            width: '725px',
            height: '1px',
          }}
        />
        <Typography fontSize="24px"># of results per page</Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
          <Typography fontSize="48px">30</Typography>
          <Typography fontSize="16px" letterSpacing="0.15px" marginLeft="10px">
            results
          </Typography>
        </Box>
        <Box>
          <Slider />
        </Box>
        <Divider
          sx={{
            marginTop: '30px',
            background: 'white',
            opacity: 0.1,
            width: '725px',
            height: '1px',
          }}
        />
        <Box sx={{ position: 'fixed', bottom: '87px' }}>
          <Button text="Search" />
        </Box>
      </SearchBox>
      <Profile />
    </PageLayout>
  );
}

export default HomePage;
