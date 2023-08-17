import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';

const InputNumber = ({ value, onChange, label }: { value: string; onChange: (value: string) => void; label: string }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value;
    value = value.replaceAll(',', '.');
    if (/[^\d.]/g.test(value) || /\..*\./g.test(value)) return;
    if (value[0] === '0' && value.length > 1 && value[1] !== '.') value = value.slice(1);
    if (value === '.') value = '0.';
    onChange(value);
  };

  const id = label.toLowerCase().replaceAll(' ', '-');
  return <TextField required id={id} label={label} value={value} onChange={handleChange} />;
};

export default InputNumber;
