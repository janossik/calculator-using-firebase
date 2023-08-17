import { Box, Button, Modal, Paper, Typography } from '@mui/material';
import { ReactElement } from 'react';

interface CustomModalProps {
  openButtonChildren?: string | ReactElement;
  confirmButtonChildren?: string | ReactElement;
  cancelButtonChildren?: string | ReactElement;
  open: boolean;
  handleClose: VoidFunction;
  handleOpen: VoidFunction;
  onConfirm: VoidFunction;
  content: string | ReactElement;
}

function CustomModal({
  openButtonChildren = 'Open',
  confirmButtonChildren = 'Confirm',
  cancelButtonChildren = 'Cancel',
  open,
  handleClose,
  handleOpen,
  onConfirm,
  content,
}: CustomModalProps) {
  return (
    <Box>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        {openButtonChildren}
      </Button>
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '10vh' }}>
        <Paper sx={{ minWidth: 200, maxWidth: 300 }}>
          <Box p={1}>
            <Box height={100} p={1}>
              <Typography>{content}</Typography>
            </Box>
            <Button color="error" onClick={onConfirm}>
              {confirmButtonChildren}
            </Button>
            <Button onClick={handleClose}>{cancelButtonChildren}</Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}

export default CustomModal;
