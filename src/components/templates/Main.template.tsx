import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../hooks/useUser.tsx';
import { CssBaseline } from '@mui/material';

function MainTemplate() {
  return (
    <UserProvider>
      <CssBaseline />
      <Outlet />
    </UserProvider>
  );
}

export default MainTemplate;
