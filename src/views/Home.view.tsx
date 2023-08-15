import { Stack, Typography } from '@mui/material';
import { UserCalculationMesh } from '@/components/UserCalculationMesh';

function HomeView() {
  return (
    <Stack spacing={2} p={1}>
      <Typography variant="h1" fontSize="xx-large">
        Recent calculations
      </Typography>
      <UserCalculationMesh />
    </Stack>
  );
}

export default HomeView;
