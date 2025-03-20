import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Unauthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: '/login' });
    toast.error('ログインしてください。');
  }, [navigate]);

  return null;
}
