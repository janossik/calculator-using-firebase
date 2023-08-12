import { Outlet } from 'react-router-dom';
import { Paper, BottomNavigation, BottomNavigationAction, CssBaseline } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Home';
import History from '@mui/icons-material/HistorySharp';
import CalculateSharp from '@mui/icons-material/CalculateSharp';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function MainTemplate() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const moveTo = (path: string) => {
    return () => navigate(path);
  };
  return (
    <>
      <CssBaseline />
      <Outlet />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels value={value} onChange={(_e, v: number) => setValue(v)}>
          <BottomNavigationAction label="HomeView" icon={<RestoreIcon />} onClick={moveTo('/')} />
          <BottomNavigationAction label="Calculator" icon={<CalculateSharp />} onClick={moveTo('/calculator')} />
          <BottomNavigationAction label="History" icon={<History />} onClick={moveTo('/history')} />
        </BottomNavigation>
      </Paper>
    </>
  );
}

export default MainTemplate;
