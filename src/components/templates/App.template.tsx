import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageSkeleton from '@/components/PageSkeleton';
import { useCheckUser } from '@/hooks/useCheckUser.tsx';
import Navigation from '@/components/Navigation';

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
