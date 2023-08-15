import { Calculation } from '@/types/Calculation';
import { Box, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import { CardCalculation } from '@/components/CardCalculationMesh/CardCalculation.tsx';

export function CardCalculationMesh({
  calculations,
  isAllLoaded,
  clickLoadMore,
}: {
  calculations: (Calculation & { id: string })[];
  isAllLoaded: boolean;
  clickLoadMore: () => void;
}) {
  return (
    <Box sx={{ flexGrow: 1 }} component="article">
      <Grid2 container spacing={2} pb={1} component="section">
        {calculations.map((calculation) => {
          return <CardCalculation key={calculation.id} {...calculation} />;
        })}
      </Grid2>
      <Box sx={{ display: 'flex', justifyContent: 'center' }} component="footer">
        {isAllLoaded && <Button onClick={clickLoadMore}>Load more</Button>}
      </Box>
    </Box>
  );
}
