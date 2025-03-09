import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

export default function Unauthorized() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: '/admin/login' });
  }, [navigate]);

  return null;
}
