import { Outlet } from 'react-router-dom';
import { UserProvider } from '../../hooks/useUser.tsx';
import { ColorModeProvider } from '@/hooks/useColorMode.tsx';

function MainTemplate() {
  return (
    <ColorModeProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </ColorModeProvider>
  );
}

export default MainTemplate;
