import { Calculation } from '@/types/Calculation';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Divider, Stack, Tooltip, Typography } from '@mui/material';
import { Create, Update } from '@mui/icons-material';
import { CardCalculationList } from '@/components/CardCalculationMesh/CardCalculationList.tsx';

export function CardCalculation({ id, createdAt, updatedAt, calculations }: Calculation & { id: string }) {
  return (
    <Grid2 xs={12} md={6} lg={4}>
      <Link to={`/app/calculator/${id}`} style={{ textDecoration: 'none' }}>
        <Card sx={{ minWidth: 300, minHeight: 188 }}>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Tooltip title="Created at">
                  <Box display="flex" gap={1} alignItems="center">
                    <Create />
                    <Typography fontSize="large">{createdAt.toDate().toLocaleDateString()}</Typography>
                  </Box>
                </Tooltip>
                <Tooltip title="Updated at">
                  <Box display="flex" gap={1} alignItems="center">
                    <Update />
                    <Typography fontSize="large">{updatedAt?.toDate().toLocaleDateString()}</Typography>
                  </Box>
                </Tooltip>
              </Stack>
              <Divider />
              <CardCalculationList calculations={calculations} />
            </Stack>
          </CardContent>
        </Card>
      </Link>
    </Grid2>
  );
}
