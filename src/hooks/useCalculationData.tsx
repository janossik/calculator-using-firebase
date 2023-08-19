import { useCallback, useEffect, useRef, useState } from 'react';
import { getCountFromServer, limit, orderBy, query, QueryConstraint, QueryDocumentSnapshot } from 'firebase/firestore';
import { Calculation } from '@/types/Calculation';
import { firestoreUtils } from '@/firebase/firestore.ts';
import { useAlert } from '@/hooks/useAlert';

export function useCalculationData(...pathSegments: string[]) {
  const path = pathSegments.join('/');
  const [last, setLast] = useState<QueryDocumentSnapshot | null>();
  const [count, setCount] = useState<number>(0);
  const [calculations, setCalculations] = useState<(Calculation & { id: string })[]>([]);
  const isAllLoaded = count > calculations.length;
  const isLoadingRef = useRef(false);
  const { handleAlert } = useAlert();

  const loadMore = useCallback(
    async (...queryConstraint: QueryConstraint[]) => {
      if (isLoadingRef.current) {
        return handleAlert({
          type: 'info',
          message: 'Loading in progress',
          timeout: 3000,
        });
      }
      isLoadingRef.current = true;
      const ref = firestoreUtils.getRefCollection(path);
      const currentQuery = query(ref, orderBy('updatedAt', 'desc'), limit(3), ...queryConstraint);
      const snapshot = await firestoreUtils.getCollection(currentQuery);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as typeof calculations;
      setCalculations((currentCalculations) => [...currentCalculations, ...data]);
      setLast(snapshot.docs[snapshot.docs.length - 1]);
      isLoadingRef.current = false;
      return ref;
    },
    [handleAlert, path],
  );

  useEffect(() => {
    (async () => {
      try {
        const ref = await loadMore();
        if (!ref) return;
        const snapshotCount = await getCountFromServer(ref);
        setCount(snapshotCount.data().count);
      } catch (error) {
        handleAlert({
          type: 'error',
          message: "Can't load calculations",
          timeout: 3000,
        });
      }
    })();
    return () => {
      setCalculations([]);
      setLast(null);
      setCount(0);
    };
  }, [handleAlert, loadMore]);

  return { calculations, isAllLoaded, loadMore, last, isLoading: isLoadingRef.current };
}
