import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../hooks/useUser.tsx';
import { ColorModeProvider } from '@/hooks/useColorMode.tsx';
import PageSkeleton from '@/components/PageSkeleton';
import { Suspense } from 'react';
import { useAlert } from '@/hooks/useAlert';
import { Alert, Box } from '@mui/material';

function MainTemplate() {
  const { alerts } = useAlert();

  return (
    <ColorModeProvider>
      <UserProvider>
        <Suspense fallback={<PageSkeleton />}>
          <Outlet />
        </Suspense>
        {alerts.length ? (
          <Box
            sx={{
              position: 'fixed',
              bottom: 60,
              left: 0,
            }}
          >
            {alerts.map((alert, index) => (
              <Alert key={index} severity={alert.type}>
                {alert.message}
              </Alert>
            ))}
          </Box>
        ) : (
          <> </>
        )}
      </UserProvider>
    </ColorModeProvider>
  );
}

export default MainTemplate;
