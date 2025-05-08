import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router/config';
import { useAuthStore } from '@/entities/user/auth/model/store';
import { queryClient } from '@/shared/api/auth-user/query-client';
import { TanStackReactQueryDevelopmentTools } from '@/shared/config/developmentTools';

const Router = () => {
  const auth = useAuthStore((state) => state);
  return (
    <RouterProvider
      router={router}
      context={{ queryClient, auth }}
    />
  );
};

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TanStackReactQueryDevelopmentTools
        initialIsOpen={false}
        buttonPosition="bottom-right"
      />
      <Router />
    </QueryClientProvider>
  );
};
