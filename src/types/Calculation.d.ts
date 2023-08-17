import { Timestamp } from 'firebase/firestore';

export interface Calculation {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  author: string;
  details: {
    firstNumber: number;
    secondNumber: number;
    result: number;
    operation: string;
  }[];
}
