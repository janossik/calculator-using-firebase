import { Outlet, useLocation } from 'react-router-dom';
import PageSkeleton from '../PageSkeleton';
import { useCheckUser } from '../../hooks/useCheckUser.tsx';
import Navigation from '../Navigation';
import { useEffect } from 'react';

function AppTemplate() {
  const user = useCheckUser();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') return;
    localStorage.setItem('lastLocation', location.pathname);
  }, [location]);

  if (!user) {
    return <PageSkeleton />;
  }

  return (
    <>
      <Outlet />
      <Navigation />
    </>
  );
}

export default AppTemplate;
