import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Calculate, History, Home, More } from '@mui/icons-material';
import SideBar from '@/components/Navigation/SideBar.tsx';
import { localStorageUtils } from '@/helpers/localStorageUtils.ts';

function Navigation() {
  const [path, setPath] = useState('/app');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const value = localStorageUtils.getLastLocation('/app');
    value && setPath(value);
  }, []);

  useEffect(() => {
    //A more responsive solution will be needed in the future
    if (location.pathname.includes('/app/calculator')) {
      return setPath('/app/calculator');
    }
  }, [location]);

  const handleNavigate = (path: string) => {
    setPath(path);
    navigate(path);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <SideBar open={open} handleClose={handleClose} />
      <BottomNavigation
        showLabels
        value={path}
        onChange={async (_e, currentPath: unknown) => {
          if (typeof currentPath !== 'string') return;
          handleNavigate(currentPath);
        }}
      >
        <BottomNavigationAction label="Home" icon={<Home />} value="/app" />
        <BottomNavigationAction label="Calculator" icon={<Calculate />} value="/app/calculator" />
        <BottomNavigationAction label="History" icon={<History />} value="/app/history" />
        <BottomNavigationAction label="More" icon={<More />} onClick={handleOpen} />
      </BottomNavigation>
    </Paper>
  );
}

export default Navigation;
