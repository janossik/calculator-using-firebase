import { Box, Paper, Stack, Typography } from '@mui/material';
import { useCalculationData } from '@/hooks/useCalculationData.tsx';
import { CardCalculationMesh } from '@/components/CardCalculationMesh/CardCalculationMesh.tsx';
import { startAfter } from 'firebase/firestore';
import { useUser } from '@/hooks/useUser.tsx';
import { Link } from 'react-router-dom';
function HomeView() {
  const { user } = useUser();
  const { calculations, isAllLoaded, loadMore, last, isLoading } = useCalculationData('users', user!.uid, 'calculations');
  return (
    <Stack spacing={2} p={1}>
      <Typography variant="h1" fontSize="xx-large">
        Recent calculations
      </Typography>
      <CardCalculationMesh
        isLoading={isLoading}
        calculations={calculations}
        isAllLoaded={isAllLoaded}
        clickLoadMore={async () => await loadMore(startAfter(last))}
      />
      {calculations.length === 0 && !isLoading && (
        <Paper>
          <Box p={1}>
            <Typography fontSize="large">You don&apos;t have any calculations yet.</Typography>
            <Link to="/app/calculator">
              <Typography
                fontSize="large"
                color="primary"
                sx={{
                  textDecoration: 'underline',
                }}
              >
                Create one now!
              </Typography>
            </Link>
          </Box>
        </Paper>
      )}
    </Stack>
  );
}

export default HomeView;
