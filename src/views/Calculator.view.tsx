import { Alert, Box, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Calculator } from '@/components/Calculator';
import { useCalculation } from '@/hooks/useCalculation.tsx';
import { CalculationDetailList } from 'src/components/CalculationDetailList';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomModal from '@/components/CustomModal';
import { useUser } from '@/hooks/useUser.tsx';

function CalculatorView() {
  const params = useParams();
  const { user } = useUser();
  const uid = params.uid || user!.uid;
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { calculations, create, update, deleteCalculation } = useCalculation();

  const removeCalculation = async () => {
    if (!params?.id) {
      throw new Error('No calculation id provided');
    }
    await deleteCalculation(params.id);
    navigate('/app/calculator');
    handleClose();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const createOrUpdateCalculation = async (props: { firstNumber: number; secondNumber: number; operation: string; result: number }) => {
    if (!params.id) {
      const ref = await create(props);
      return navigate(`/app/calculator/${ref.id}`);
    }
    await update({ docId: params.id, ...props });
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Paper>
        <Box p={2} mb={2}>
          <Typography variant="h1" fontSize="xxx-large" pb={3}>
            Calculator
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
            <Calculator onSubmit={createOrUpdateCalculation} />
            {params?.id && uid === user?.uid && (
              <CustomModal
                open={open}
                openButtonChildren={<DeleteForeverIcon />}
                handleClose={handleClose}
                handleOpen={handleOpen}
                onConfirm={removeCalculation}
                content="Are you sure you want to delete this calculation?"
              />
            )}
          </Stack>
        </Box>
      </Paper>
      <CalculationDetailList details={calculations} />
      {success && <Alert severity="success">Successfully deleted calculation</Alert>}
    </Box>
  );
}
//calculates

export default CalculatorView;
