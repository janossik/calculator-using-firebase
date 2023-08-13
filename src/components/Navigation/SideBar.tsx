import { useUser } from '@/hooks/useUser.tsx';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Logout } from '@mui/icons-material';
import { authUtils } from '@/firebase/authentication.ts';

function SideBar({ open, handleClose }: { open: boolean; handleClose: () => void }) {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <List sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="user avatar" src={user?.photoURL || ''} />
          </ListItemAvatar>
          <ListItemText primary={user?.displayName} secondary={user?.email} />
        </ListItem>
        <Divider />
      </List>
      <Button
        variant="contained"
        startIcon={<Logout />}
        sx={{
          borderRadius: 0,
        }}
        onClick={async () => {
          await authUtils.signOut();
          navigate('/');
          handleClose();
        }}
      >
        Logout
      </Button>
    </Drawer>
  );
}

export default SideBar;
