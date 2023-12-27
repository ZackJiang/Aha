import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import media from '../../common/constants';

const StyledButton = styled(Button)`
  padding: 13px 16px;
  background: white;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  border-radius: 4px;
  width: 343px;

  &:hover {
    border: 1px solid #fff;
    background: #121212;
    color: #fff;
  }

  ${media.small.down`
    width: 100%;
  `}
`;
interface CustomButtonProps {
  text: string;
  onClick: () => void;
}

function CustomButton(props: CustomButtonProps) {
  const { text, onClick } = props;
  return (
    <StyledButton variant="contained" onClick={onClick}>
      {text}
    </StyledButton>
  );
}

export default CustomButton;
