import { useCalculationData } from '@/hooks/useCalculationData.tsx';
import { Stack, Typography } from '@mui/material';
import { CardCalculationMesh } from '@/components/CardCalculationMesh/CardCalculationMesh.tsx';
import { startAfter } from 'firebase/firestore';

function HistoryView() {
  const { calculations, isAllLoaded, loadMore, last } = useCalculationData('communications');
  return (
    <Stack spacing={2} p={1}>
      <Typography variant="h1" fontSize="xx-large">
        History all users
      </Typography>
      <CardCalculationMesh
        calculations={calculations}
        isAllLoaded={isAllLoaded}
        clickLoadMore={async () => await loadMore(startAfter(last))}
        showAuthor={true}
      />
    </Stack>
  );
}

export default HistoryView;
