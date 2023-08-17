import { Box, MenuItem, TextField, Tooltip } from '@mui/material';

const operations = [
  { value: '+', label: 'Addition' },
  { value: '-', label: 'Subtraction' },
  { value: '*', label: 'Multiplication' },
  { value: '/', label: 'Division' },
];

export const SelectOperation = ({ operation, setOperation }: { operation: string; setOperation: (operation: string) => void }) => {
  return (
    <TextField
      select
      id="select-operation"
      label="Select operation"
      defaultValue={operations[0].value}
      value={operation}
      onChange={({ target }) => setOperation(target.value)}
    >
      {operations.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          <Tooltip title={label} arrow>
            <Box width="120px">{value}</Box>
          </Tooltip>
        </MenuItem>
      ))}
    </TextField>
  );
};
