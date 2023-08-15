import { Calculation } from '@/types/Calculation';
import { Stack } from '@mui/material';
import { CardCalculationListElement } from '@/components/CardCalculationMesh/CardCalculationListElement.tsx';

export function CardCalculationList({ calculations }: { calculations: Calculation['calculations'] }) {
  return (
    <Stack spacing={1}>
      {calculations
        .slice(-3)
        .reverse()
        .map((calc, index) => (
          <CardCalculationListElement key={index} {...calc} />
        ))}
    </Stack>
  );
}
