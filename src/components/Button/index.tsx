import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
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
  width?: string;
}

function CustomButton(props: CustomButtonProps) {
  const { text, onClick, width } = props;
  return (
    <StyledButton variant="contained" onClick={onClick} sx={{ width }}>
      {text}
    </StyledButton>
  );
}

CustomButton.defaultProps = {
  width: '343px',
};

export default CustomButton;
