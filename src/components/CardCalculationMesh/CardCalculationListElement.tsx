import { Calculation } from '@/types/Calculation';
import { Typography } from '@mui/material';

export function CardCalculationListElement({ operation, result, secondNumber, firstNumber }: Calculation['calculations'][0]) {
  return (
    <Typography>
      {firstNumber} {operation} {secondNumber} = {result}{' '}
    </Typography>
  );
}
