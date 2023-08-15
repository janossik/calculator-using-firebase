import { useUserCalculation } from '@/hooks/useUserCalculation.tsx';
import { CardCalculationMesh } from '@/components/CardCalculationMesh/CardCalculationMesh.tsx';
import { startAfter } from 'firebase/firestore';

export function UserCalculationMesh() {
  const { calculations, isAllLoaded, loadMore, last } = useUserCalculation();
  return <CardCalculationMesh calculations={calculations} isAllLoaded={isAllLoaded} clickLoadMore={async () => await loadMore(startAfter(last))} />;
}
