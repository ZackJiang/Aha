import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  width: 311px;
  padding: 13px 16px;
  background: white;
  color: #121212;
  font-size: 14px;
  font-weight: 700;
  line-height: 100%;
  border-radius: 4px;

  &:hover {
    border: 1px solid #fff;
    background: #121212;
    color: #fff;
  }
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
