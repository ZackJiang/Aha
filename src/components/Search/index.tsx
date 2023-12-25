import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Slider from '../Slider';
import Button from '../Button';

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

function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const [sliderValue, setSliderValue] = useState(3);
  const [error, setError] = useState('');

  useEffect(() => {
    if (error) {
      setError('');
    }
  }, [keyword]);

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSliderValue(newValue[0]);
    } else {
      setSliderValue(newValue);
    }
  };

  const onClick = () => {
    if (keyword.trim() === '') {
      setError('Please enter a keyword.');
      return;
    }
    setError('');
    navigate(`?page=${1}&pageSize=${sliderValue}&keyword=${keyword}`);
  };

  return (
    <SearchBox>
      <Typography fontSize="24px">Search</Typography>
      <StyledTextField
        variant="outlined"
        InputProps={{
          placeholder: 'Keyword',
        }}
        value={keyword}
        onChange={handleKeywordChange}
      />
      {error && (
        <Typography color="error" fontSize="14px" mt="8px">
          {error}
        </Typography>
      )}
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
        <Typography fontSize="48px">{sliderValue}</Typography>
        <Typography fontSize="16px" letterSpacing="0.15px" marginLeft="10px">
          results
        </Typography>
      </Box>
      <Box>
        <Slider onChange={handleSliderChange} />
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
        <Button text="Search" onClick={onClick} />
      </Box>
    </SearchBox>
  );
}

export default Search;
