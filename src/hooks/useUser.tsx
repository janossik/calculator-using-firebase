import { User } from 'firebase/auth';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { authUtils } from '@/firebase/authentication';
import { useAlert } from '@/hooks/useAlert';

interface UserContextProps {
  user: User | null;
}

export const UserContext = createContext<UserContextProps>({ user: null });

interface UserProviderProps {
  children: ReactElement | ReactElement[];
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserContextProps['user']>(null);
  const { handleAlert } = useAlert();
  useEffect(() => {
    try {
      const unsubscribe = authUtils.onAuthStateChanged(setUser);
      return () => {
        unsubscribe();
      };
    } catch (error) {
      handleAlert({
        type: 'error',
        message: "Can't load user",
        timeout: 3000,
      });
    }
  }, [handleAlert]);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const User = useContext(UserContext);
  if (!User) {
    throw Error('useUser needs to be inside inside UserProvider');
  }
  return User;
};
