import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { auth } from '../../firebase';
import RestoreIcon from '@mui/icons-material/Home';
import CalculateSharp from '@mui/icons-material/CalculateSharp';
import History from '@mui/icons-material/HistorySharp';
import Logout from '@mui/icons-material/Logout';

function Navigation() {
  const [path, setPath] = useState('/app');
  const navigate = useNavigate();

  useEffect(() => {
    const value = localStorage.getItem('lastLocation');
    value && setPath(value);
  }, []);

  const handleNavigate = (path: string) => {
    setPath(path);
    navigate(path);
  };

  const handleLogout = async () => {
    await auth.signOut();
    handleNavigate('/');
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={path}
        onChange={async (_e, currentPath: unknown) => {
          if (typeof currentPath !== 'string') return;
          if (currentPath === '/') await handleLogout();

          handleNavigate(currentPath);
        }}
      >
        <BottomNavigationAction label="HomeView" icon={<RestoreIcon />} value="/app" />
        <BottomNavigationAction label="Calculator" icon={<CalculateSharp />} value="/app/calculator" />
        <BottomNavigationAction label="History" icon={<History />} value="/app/history" />
        <BottomNavigationAction label="Logout" icon={<Logout />} value="/" />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
