import { Container, Paper, Stack, Typography } from '@mui/material';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Link } from 'react-router-dom';

function NotFoundView() {
  return (
    <Container>
      <Paper
        elevation={2}
        sx={{
          padding: 2,
          margin: 2,
          borderRadius: 2,
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h2">
            Not Found 404 <SentimentDissatisfiedIcon sx={{ fontSize: '64px' }} />
          </Typography>
          <Link to="/">
            <Typography
              fontSize="large"
              color="primary"
              sx={{
                textDecoration: 'underline',
              }}
            >
              Go back
            </Typography>
          </Link>
        </Stack>
      </Paper>
    </Container>
  );
}

export default NotFoundView;
