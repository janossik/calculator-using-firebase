import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, ReactElement, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const UserContext = createContext<{ user: User | null }>({ user: null });

export const UserProvider = ({ children }: { children: ReactElement | ReactElement[] }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

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
