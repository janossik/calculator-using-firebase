import { Calculation } from '@/types/Calculation';
import { Stack, Typography } from '@mui/material';
import { CalculationDetailListElement } from '@/components/CalculationDetailList/CalculationDetailListElement.tsx';

export const CalculationDetailList = ({ details }: { details: Calculation['details'][0][] }) => {
  return (
    <Stack sx={{ gap: '10px', flexDirection: 'column-reverse' }}>
      {details.map(({ firstNumber, operation, secondNumber, result }, index) => (
        <CalculationDetailListElement key={index}>
          <Typography>{`${firstNumber} ${operation} ${secondNumber} = ${result}`}</Typography>
        </CalculationDetailListElement>
      ))}
    </Stack>
  );
};
