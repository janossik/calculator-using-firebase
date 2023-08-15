import * as firestore from 'firebase/firestore';
import { db } from './index.ts';

class FirestoreUtils {
  db: firestore.Firestore;
  private _onErrorForOnSnapshot: (error: firestore.FirestoreError) => void = (error) => {
    console.error(error);
  };

  set onErrorForOnSnapshot(value: (error: firestore.FirestoreError) => void) {
    this._onErrorForOnSnapshot = value;
  }

  constructor(db: firestore.Firestore) {
    this.db = db;
  }
  getRefCollection<T extends firestore.DocumentData>(...pathSegments: string[]) {
    const [segment, ...restSegments] = pathSegments;
    return firestore.collection(this.db, segment, ...restSegments) as firestore.CollectionReference<T, T>;
  }

  getRefDocument<T extends firestore.DocumentData>(...pathSegments: string[]) {
    const [segment, ...restSegments] = pathSegments;
    return firestore.doc(this.db, segment, ...restSegments) as firestore.DocumentReference<T, T>;
  }

  async getDocumentData<T extends firestore.DocumentData>(...pathSegments: string[]) {
    const result = await firestore.getDoc<T, T>(this.getRefDocument(...pathSegments));
    return result.data();
  }

  async getCollectionData<T extends firestore.DocumentData>(...pathSegments: string[]) {
    const result = await firestore.getDocs<T, T>(this.getRefCollection(...pathSegments));
    return result.docs.map((doc) => doc.data());
  }

  async getCollection<T extends firestore.DocumentData>(...pathSegments: string[]): Promise<firestore.QuerySnapshot<T, T>>;
  async getCollection<T extends firestore.DocumentData>(arg: firestore.Query<T, T>): Promise<firestore.QuerySnapshot<T, T>>;
  async getCollection<T extends firestore.DocumentData>(arg: firestore.Query<T, T> | string, ...pathSegments: string[]) {
    if (typeof arg === 'string') {
      return await firestore.getDocs<T, T>(this.getRefCollection(...pathSegments));
    }
    return await firestore.getDocs<T, T>(arg);
  }

  async addDoc<T extends firestore.WithFieldValue<firestore.DocumentData>>(data: T, ...pathSegments: string[]) {
    return await firestore.addDoc<T, T>(this.getRefCollection(...pathSegments), data);
  }

  async addDocAndSetState<T extends firestore.WithFieldValue<firestore.DocumentData>>(data: T, setState: (value: T) => void, ...pathSegments: string[]) {
    const result = await this.addDoc(data, ...pathSegments);
    setState(data);
    return result;
  }

  async setStateByDocumentData<T extends firestore.DocumentData>(setState: (value?: T) => void, ...pathSegments: string[]) {
    const data = await this.getDocumentData<T>(...pathSegments);
    setState(data);
    return data;
  }

  async setDocument<T extends firestore.WithFieldValue<firestore.DocumentData>>(data: T, ...pathSegments: string[]) {
    await firestore.setDoc(this.getRefDocument(...pathSegments), data);
    return data;
  }

  async updateDocument<T extends firestore.WithFieldValue<firestore.DocumentData>>(data: T, ...pathSegments: string[]) {
    await firestore.updateDoc(this.getRefDocument(...pathSegments), data);
    return data;
  }

  async setDocumentAndState<T extends firestore.WithFieldValue<firestore.DocumentData>>(data: T, setState: (value: T) => void, ...pathSegments: string[]) {
    await firestore.setDoc(this.getRefDocument(...pathSegments), data);
    setState(data);
    return data;
  }

  async mergeDocument<T extends firestore.WithFieldValue<firestore.DocumentData>>(data: T, ...pathSegments: string[]) {
    await firestore.setDoc(this.getRefDocument(...pathSegments), data, { merge: true });
    return data;
  }

  async mergeDocumentAndSetState<T extends firestore.WithFieldValue<firestore.DocumentData>>(data: T, setState: (value: T) => void, ...pathSegments: string[]) {
    await firestore.setDoc(this.getRefDocument(...pathSegments), data);
    setState(data);
    return data;
  }
  async deleteFieldDocument(field: string, ...pathSegments: string[]) {
    await firestore.updateDoc(this.getRefDocument(...pathSegments), { [field]: firestore.deleteField() });
  }
  async deleteFieldDocumentAndSetState<T extends firestore.WithFieldValue<firestore.DocumentData>>(
    field: string,
    setState: (value?: T) => void,
    ...pathSegments: string[]
  ) {
    await firestore.updateDoc(this.getRefDocument(...pathSegments), { [field]: firestore.deleteField() });
    const data = await this.getDocumentData<T>(...pathSegments);
    setState(data);
    return data;
  }

  async deleteDocument(path: string, ...pathSegments: string[]) {
    await firestore.deleteDoc(this.getRefDocument(path, ...pathSegments));
  }
  onSnapshotDocumentData<T extends firestore.DocumentData>(setState: (value?: T) => void, ...pathSegments: string[]) {
    return firestore.onSnapshot<T, T>(
      this.getRefDocument(...pathSegments),
      (doc) => {
        const data = doc.data();
        setState(data);
      },
      this._onErrorForOnSnapshot,
    );
  }

  onSnapshotCollection<T extends firestore.DocumentData>(
    onNext: (value: firestore.QuerySnapshot<T, T>) => void,
    ...pathSegments: string[]
  ): firestore.Unsubscribe;
  onSnapshotCollection<T extends firestore.DocumentData>(onNext: (value: firestore.QuerySnapshot<T, T>) => void, arg: firestore.Query): firestore.Unsubscribe;
  onSnapshotCollection<T extends firestore.DocumentData>(
    onNext: (value: firestore.QuerySnapshot<T, T>) => void,
    arg: string | firestore.Query<T, T>,
    ...pathSegments: string[]
  ) {
    if (typeof arg === 'string') {
      return firestore.onSnapshot<T, T>(this.getRefCollection(arg, ...pathSegments), onNext, this._onErrorForOnSnapshot);
    }
    return firestore.onSnapshot<T, T>(arg, onNext, this._onErrorForOnSnapshot);
  }

  onSnapshotCollectionData<T extends firestore.DocumentData>(setState: (value: T[]) => void, ...pathSegments: string[]): firestore.Unsubscribe;
  onSnapshotCollectionData<T extends firestore.DocumentData>(setState: (value: T[]) => void, arg: firestore.Query): firestore.Unsubscribe;
  onSnapshotCollectionData<T extends firestore.DocumentData>(setState: (value: T[]) => void, arg: string | firestore.Query<T, T>, ...pathSegments: string[]) {
    if (typeof arg === 'string') {
      return firestore.onSnapshot<T, T>(
        this.getRefCollection(arg, ...pathSegments),
        (snapshot) => {
          const data = snapshot.docs.map((doc) => doc.data());
          setState(data);
        },
        this._onErrorForOnSnapshot,
      );
    }
    return firestore.onSnapshot<T, T>(
      arg,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setState(data);
      },
      this._onErrorForOnSnapshot,
    );
  }
}

export const firestoreUtils = new FirestoreUtils(db);
