import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundView() {
  return (
    <Container>
      <Typography variant="h2">Not Found 404</Typography>
      <Link to="/">
        <Typography>Go back</Typography>
      </Link>
    </Container>
  );
}

export default NotFoundView;
