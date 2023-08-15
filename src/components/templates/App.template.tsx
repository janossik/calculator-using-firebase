import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageSkeleton from '@/components/PageSkeleton';
import { useCheckUser } from '@/hooks/useCheckUser.tsx';
import Navigation from '@/components/Navigation';
import { localStorageUtils } from '@/helpers/localStorageUtils.ts';
import { Box } from '@mui/material';

function AppTemplate() {
  const user = useCheckUser();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') return;
    localStorageUtils.setLastLocation(location.pathname);
  }, [location]);

  if (!user) {
    return <PageSkeleton />;
  }

  return (
    <Box pb="60px">
      <Outlet />
      <Navigation />
    </Box>
  );
}

export default AppTemplate;
