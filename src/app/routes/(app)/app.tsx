import { createFileRoute, redirect } from '@tanstack/react-router';
import { AppLayout } from '../../layout/app-layout';

export const Route = createFileRoute('/(app)/app')({
  beforeLoad: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      redirect({
        to: '/login',
        throw: true,
      });
    }
  },

  component: AppLayout,
});
