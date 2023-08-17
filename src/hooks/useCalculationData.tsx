import { useCallback, useEffect, useState } from 'react';
import { getCountFromServer, limit, orderBy, query, QueryConstraint, QueryDocumentSnapshot } from 'firebase/firestore';
import { Calculation } from '@/types/Calculation';
import { firestoreUtils } from '@/firebase/firestore.ts';

export function useCalculationData(...pathSegments: string[]) {
  const [last, setLast] = useState<QueryDocumentSnapshot | null>();
  const [count, setCount] = useState<number>(0);
  const [calculations, setCalculations] = useState<(Calculation & { id: string })[]>([]);
  const isAllLoaded = count > calculations.length;

  const loadMore = useCallback(async (...queryConstraint: QueryConstraint[]) => {
    const ref = firestoreUtils.getRefCollection(...pathSegments);
    const currentQuery = query(ref, orderBy('updatedAt', 'desc'), limit(3), ...queryConstraint);
    const snapshot = await firestoreUtils.getCollection(currentQuery);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as typeof calculations;
    setCalculations((currentCalculations) => {
      // During development, I noticed that sometimes the same calculation is returned twice. In hot reload, it's a problem, but in production it is not.
      return currentCalculations.length === 0 ? data : currentCalculations[0]?.id === data[0]?.id ? data : [...currentCalculations, ...data];
    });
    setLast(snapshot.docs[snapshot.docs.length - 1]);
    return ref;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const ref = await loadMore();
      if (!ref) return;
      const snapshotCount = await getCountFromServer(ref);
      setCount(snapshotCount.data().count);
    })();
  }, [loadMore]);

  return { calculations, isAllLoaded, loadMore, last };
}
