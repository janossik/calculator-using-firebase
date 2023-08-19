import { Alert, Box, Paper, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Calculator } from '@/components/Calculator';
import { useCalculation } from '@/hooks/useCalculation.tsx';
import { CalculationDetailList } from 'src/components/CalculationDetailList';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CustomModal from '@/components/CustomModal';
import { useUser } from '@/hooks/useUser.tsx';
import { useAlert } from '@/hooks/useAlert';

function CalculatorView() {
  const { handleAlert } = useAlert();

  const params = useParams();
  const { user } = useUser();
  const uid = params.uid || user!.uid;
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { calculations, create, update, deleteCalculation } = useCalculation();

  const removeCalculation = async () => {
    if (!params?.id) {
      return handleAlert({ type: 'error', message: 'No calculation id provided', timeout: 3000 });
    }
    try {
      await deleteCalculation(params.id);
      navigate('/app/calculator');
      handleClose();
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      handleAlert({ type: 'error', message: 'Something went wrong, please try again later or you can contact us', timeout: 3000 });
      console.error(error);
    }
  };

  const createOrUpdateCalculation = async (props: { firstNumber: number; secondNumber: number; operation: string; result: number }) => {
    try {
      if (!params.id) {
        const ref = await create(props);
        return navigate(`/app/calculator/${ref.id}`);
      }
      await update({ docId: params.id, ...props });
    } catch (error) {
      handleAlert({ type: 'error', message: 'Something went wrong, please try again later or you can contact us', timeout: 3000 });
      console.error(error);
    }
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
