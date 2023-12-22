import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const Card = styled(Box)`
  display: flex;
  padding: 0px 16px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Avatar = styled(Box)`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #f8f8f8;
  background: green;
`;

const StyledButton = styled(Button)`
  padding: 8px 10px;
  border-radius: 20px;
  border: 1px solid #fff;
  min-width: unset;
  font-family: Open Sans;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  text-transform: capitalize;
`;

const StyledOutlinedButton = styled(StyledButton)`
  background: #121212;
  color: #fff;

  &:hover {
    border: none;
    background: #fff;
    color: #121212;
  }
`;

const StyledContainedButton = styled(StyledButton)`
  background: #fff;
  color: #121212;

  &:hover {
    background: #121212;
    color: #fff;
  }
`;

interface FollowButtonProps {
  text: string;
  following: boolean;
}

function FollowButton(props: FollowButtonProps) {
  const { text, following } = props;
  return (
    <div>
      {following ? (
        <StyledContainedButton>{text}</StyledContainedButton>
      ) : (
        <StyledOutlinedButton>{text}</StyledOutlinedButton>
      )}
    </div>
  );
}

function ProfileCard() {
  return (
    <Card>
      <Box display="flex">
        <Avatar />
        <Box ml="15px">
          <Typography fontSize="16px" letterSpacing="0.15px">
            Full Name
          </Typography>
          <Typography
            fontSize="14px"
            letterSpacing="0.25px"
            sx={{ opacity: 0.5 }}
          >
            @username
          </Typography>
        </Box>
      </Box>
      <Box>
        <FollowButton text="Follow" following={false} />
      </Box>
    </Card>
  );
}
export default ProfileCard;
