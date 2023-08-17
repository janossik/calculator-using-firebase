import { useState } from 'react';
import { Alert, Button, Stack, Tooltip } from '@mui/material';
import { SelectOperation } from '@/components/Calculator/SelectOperation.tsx';
import InputNumber from '@/components/InputNumber';
import { calculate } from '@/utils/calculate.ts';

interface CalculatorProps {
  onSubmit: (value: { firstNumber: number; secondNumber: number; operation: string; result: number }) => void | Promise<void>;
}

export const Calculator = ({ onSubmit }: CalculatorProps) => {
  const [firstNumber, setFirstNumber] = useState<string>('0');
  const [secondNumber, setSecondNumber] = useState<string>('0');
  const [operation, setOperation] = useState<string>('+');
  const [error, setError] = useState<string>('');
  const handleSubmit = async () => {
    try {
      setError('');
      await onSubmit({
        operation,
        firstNumber: Number(firstNumber),
        secondNumber: Number(secondNumber),
        result: Number(calculate(Number(firstNumber), Number(secondNumber), operation).toFixed(6)),
      });
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 3, md: 4 }}>
      <InputNumber value={firstNumber} onChange={setFirstNumber} label="First Number" />
      <SelectOperation operation={operation} setOperation={setOperation} />
      <InputNumber value={secondNumber} onChange={setSecondNumber} label="Second Number" />
      <Tooltip title="Calculate" arrow>
        <Button variant="contained" onClick={handleSubmit}>
          =
        </Button>
      </Tooltip>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  );
};
