import { useUser } from '@/hooks/useUser.tsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Calculation } from '@/types/Calculation';
import { firestoreUtils } from '@/firebase/firestore.ts';
import { arrayUnion, Timestamp } from 'firebase/firestore';

export const useCalculation = () => {
  const { user } = useUser();
  const params = useParams();
  const uid = params.uid || user!.uid;
  const canEdit = user && user.uid === uid;
  const [details, setDetails] = useState<Calculation['details'][0][]>([]);

  useEffect(() => {
    if (!params.id) setDetails([]);
    if (!user || !params.id) return;
    firestoreUtils.onSnapshotDocumentData(
      (data) => {
        if (!data) return;
        if (!('details' in data)) return;
        if (!Array.isArray(data.details)) return;
        setDetails(data.details);
      },
      'users',
      uid,
      'calculations',
      params.id,
    );
  }, [params.id, uid, user]);

  const create = async (props: { firstNumber: number; secondNumber: number; operation: string; result: number }) => {
    if (!canEdit) {
      throw new Error('User is not authorized to create a calculation');
    }
    const { firstNumber, secondNumber, operation, result } = props;
    const data = {
      uid: user!.uid,
      author: user!.displayName,
      details: [{ firstNumber, secondNumber, result, operation }],
      createdAt: Timestamp.fromDate(new Date()),
      updatedAt: Timestamp.fromDate(new Date()),
    };
    return await firestoreUtils.addDoc(data, 'users', uid, 'calculations');
  };

  const update = async ({ docId, ...rest }: { docId: string; firstNumber: number; secondNumber: number; operation: string; result: number }) => {
    if (!canEdit) {
      throw new Error('User is not authorized to update a calculation');
    }
    if (!user) return;

    await firestoreUtils.mergeDocument(
      {
        details: arrayUnion(rest),
        updatedAt: Timestamp.fromDate(new Date()),
      },
      'users',
      uid,
      'calculations',
      docId,
    );
  };
  console.log('co');
  const deleteCalculation = async (docId: string) => {
    if (!user) return;
    await firestoreUtils.deleteDocument('users', uid, 'calculations', docId);
  };

  return { calculations: details, create, update, deleteCalculation };
};
