import { useUser } from '@/hooks/useUser.tsx';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Logout } from '@mui/icons-material';
import { authUtils } from '@/firebase/authentication.ts';
import ModeSwitch from '@/components/Navigation/ModeSwitch.tsx';
import { useColorMode } from '@/hooks/useColorMode.tsx';

function SideBar({ open, handleClose }: { open: boolean; handleClose: () => void }) {
  const { toggleColorMode } = useColorMode();
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useUser();
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
        <ListItem>
          <ModeSwitch checked={theme.palette.mode === 'dark'} onClick={toggleColorMode} />
          <ListItemText primary={`${theme.palette.mode} mode`} />
        </ListItem>
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
