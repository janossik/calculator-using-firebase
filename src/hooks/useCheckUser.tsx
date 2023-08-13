import { useUser } from '@/hooks/useUser.tsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export function useCheckUser() {
  const { user } = useUser();
  const navigate = useNavigate();
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      if (user) return;
      navigate('/');
    }, 1000);
  }, [navigate, user]);

  return user;
}
