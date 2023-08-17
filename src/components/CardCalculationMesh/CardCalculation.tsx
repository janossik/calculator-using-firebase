import { Calculation } from '@/types/Calculation';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import { Box, Card, CardContent, Divider, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { Create, Update } from '@mui/icons-material';
import { CalculationDetailList } from 'src/components/CalculationDetailList';
import { grey } from '@mui/material/colors';

export function CardCalculation({ showAuthor, author, id, createdAt, updatedAt, details }: Calculation & { id: string; showAuthor?: boolean }) {
  const theme = useTheme();
  return (
    <Grid2 xs={12} md={6} lg={4}>
      <Link to={`/app/calculator/${id.replace('-', '/')}`} style={{ textDecoration: 'none' }}>
        <Card sx={theme.palette.mode === 'light' ? { minWidth: 300, minHeight: 188, backgroundColor: grey[200] } : { minWidth: 300, minHeight: 188 }}>
          <CardContent>
            <Stack spacing={2}>
              {showAuthor && (
                <Box display="flex" gap={1} alignItems="center">
                  <Typography fontSize="large">Author: {author}</Typography>
                </Box>
              )}
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
              <CalculationDetailList details={details.slice(-3)} />
            </Stack>
          </CardContent>
        </Card>
      </Link>
    </Grid2>
  );
}
