import { useUser } from '../hooks/useUser.tsx';
import { Navigate } from 'react-router-dom';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { authUtils } from '../firebase/authentication';
import Google from '@mui/icons-material/Google';

function AuthenticationView() {
  const { user } = useUser();

  if (user) {
    const lastLocation = localStorage.getItem('lastLocation') || '/app';
    return <Navigate to={lastLocation} />;
  }

  return (
    <Container>
      <Box display="flex" flexDirection="column" justifyContent="center" pt={4}>
        <Paper elevation={2}>
          <Stack p={2} textAlign="center" spacing={2}>
            <Typography variant="h1" fontSize="x-large">
              Calculator App
            </Typography>
            <Typography textAlign="left">
              This app is a simple calculator app that allows you to perform basic arithmetic operations. It also has a history feature that allows you to see
              your previous calculations. Used technologies: React, TypeScript, Firebase, React Router, Material UI and more. If you want to check the code, you
              can find it <a href="https://github.com/janossik/calculator-using-firebase">here</a>
            </Typography>
            <Typography variant="h2" fontSize="large" fontWeight="normal">
              Sign in to use the app
            </Typography>
            <Box>
              <Button variant="contained" onClick={async () => await authUtils.signInWithGoogle()} startIcon={<Google />}>
                Sign in with google
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}

export default AuthenticationView;
