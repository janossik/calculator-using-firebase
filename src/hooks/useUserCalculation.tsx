import { useUser } from '@/hooks/useUser.tsx';
import { useCallback, useEffect, useState } from 'react';
import { getCountFromServer, limit, orderBy, query, QueryConstraint, QueryDocumentSnapshot } from 'firebase/firestore';
import { Calculation } from '@/types/Calculation';
import { firestoreUtils } from '@/firebase/firestore.ts';

export function useUserCalculation() {
  const { user } = useUser();
  const uid = user?.uid;
  const [last, setLast] = useState<QueryDocumentSnapshot | null>();
  const [count, setCount] = useState<number>(0);
  const [calculations, setCalculations] = useState<(Calculation & { id: string })[]>([]);
  const isAllLoaded = count > calculations.length;

  const loadMore = useCallback(
    async (...queryConstraint: QueryConstraint[]) => {
      if (!uid) return;
      const ref = firestoreUtils.getRefCollection('users', uid, 'calculations');
      const currentQuery = query(ref, orderBy('updatedAt', 'desc'), limit(3), ...queryConstraint);
      const snapshot = await firestoreUtils.getCollection(currentQuery);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as typeof calculations;
      setCalculations((currentCalculations) => {
        // During development, I noticed that sometimes the same calculation is returned twice. In hot reload, it's a problem, but in production it is not.
        return currentCalculations.length === 0 ? data : currentCalculations[0].id === data[0].id ? data : [...currentCalculations, ...data];
      });
      setLast(snapshot.docs[snapshot.docs.length - 1]);
      return ref;
    },
    [uid],
  );

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
