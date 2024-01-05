import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Slider from '../Slider';
import Button from '../Button';
import media from '../../common/constants';

const errorTextStyle = {
  color: 'error',
  fontSize: '14px',
  mt: '8px',
};

const SearchBox = styled(Box)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  padding: 54px 130px 87px;

  ${media.medium.down`
    padding: 54px 65px 87px;
  `}

  ${media.small.down`
    padding: 0px 20px 24px;
  `}
`;

const StyledTextField = styled(TextField)`
  margin-top: 20px;

  ${media.small.down`
   margin-top: 16px;
  `}

  &.MuiTextField-root {
    width: 100%;
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
      padding: 20px 18px 19px;
    }
  }

  input::placeholder {
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.25px;
  }

  input {
    height: 21px;
  }
`;

const StyledDivider = styled(Divider)`
  background: white;
  opacity: 0.1;
  height: 1px;
`;

const DesktopDivider = styled(StyledDivider)`
  margin-top: 30px;

  ${media.small.down`
    display: none;
  `}
`;

const MobileDivider = styled(StyledDivider)`
  display: none;

  ${media.small.down`
    display: block;
    margin-bottom: 80px;
  `}
`;

const StyledTypography = styled(Typography)`
  font-size: 24px;
  margin-top: 30px;

  ${media.small.down`
    margin-top: 28px;
  `}
`;

const StyledResultBox = styled(Box)`
  display: flex;
  align-items: baseline;
  margin-top: 20px;

  ${media.small.down`
    margin-top: 16px;
  `}
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

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
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
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        justifyContent="space-between"
      >
        <Box>
          <Typography fontSize="24px">Search</Typography>
          <StyledTextField
            variant="outlined"
            InputProps={{
              placeholder: 'Keyword',
            }}
            value={keyword}
            onChange={handleKeywordChange}
          />
          {error && <Typography {...errorTextStyle}>{error}</Typography>}
          <DesktopDivider />
          <StyledTypography fontSize="24px">
            # Of Results Per Page
          </StyledTypography>
          <StyledResultBox>
            <Typography fontSize="48px" fontWeight={700} lineHeight="50px">
              {sliderValue}
            </Typography>
            <Typography
              fontSize="16px"
              letterSpacing="0.15px"
              marginLeft="10px"
              position="relative"
              top="-4px"
            >
              results
            </Typography>
          </StyledResultBox>
          <Box marginTop="18px" height="52px">
            <Slider onChange={handleSliderChange} />
          </Box>
          <DesktopDivider />
        </Box>
        <Box>
          <MobileDivider />
          <Button text="Search" onClick={onClick} />
        </Box>
      </Box>
    </SearchBox>
  );
}

export default Search;
