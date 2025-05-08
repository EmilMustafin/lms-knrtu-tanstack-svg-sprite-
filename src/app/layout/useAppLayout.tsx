import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { authApi } from '@/entities/user/auth/api/user-auth-api';
import { useAuthStore } from '@/entities/user/auth/model/store';

export const useAppLayout = () => {
  const router = useRouter();
  const navigate = useNavigate();

  // Получаем функции сброса из сторов
  const { setUser, logout } = useAuthStore((state) => state);

  // Мутация для логаута
  const { mutateAsync } = useMutation({
    mutationFn: authApi.logout,
    // onError: (error) => {
    //   // toast({
    //   //   variant: 'destructive',
    //   //   title: error?.message ?? 'Logout failed',
    //   // });
    // },
  });

  const handleLogout = useCallback(async () => {
    try {
      // Вызываем API логаута
      await mutateAsync();

      // Сбрасываем сторы
      await logout();
      setUser(null);

      // Инвалидируем роутер и редиректим на главную
      await router.invalidate();
      await navigate({ to: '/' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [setUser, logout, router, mutateAsync, navigate]);

  return {
    handleLogout,
  };
};
