import { Calculation } from '@/types/Calculation';
import { Box, Button, Skeleton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { CardCalculation } from '@/components/CardCalculationMesh/CardCalculation.tsx';

interface CardCalculationMeshProps {
  calculations: (Calculation & { id: string })[];
  isAllLoaded: boolean;
  clickLoadMore: () => void;
  showAuthor?: boolean;
  isLoading?: boolean;
}

export function CardCalculationMesh({ calculations, showAuthor, isAllLoaded, clickLoadMore, isLoading }: CardCalculationMeshProps) {
  if (isLoading)
    return (
      <Grid2 container spacing={2} pb={1} component="section">
        <Grid2 xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" height="188px" />
        </Grid2>
        <Grid2 xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" height="188px" />
        </Grid2>
        <Grid2 xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" height="188px" />
        </Grid2>
      </Grid2>
    );
  return (
    <Box sx={{ flexGrow: 1 }} component="article">
      <Grid2 container spacing={2} pb={1} component="section">
        {calculations.map((calculation) => {
          return <CardCalculation key={calculation.id} {...calculation} showAuthor={showAuthor} />;
        })}
      </Grid2>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} component="footer">
        {isAllLoaded && <Button onClick={clickLoadMore}>Load more</Button>}
      </Box>
    </Box>
  );
}
