import { createFileRoute } from '@tanstack/react-router';
import { AuthLoginPage } from '@/pages/auth';

export const Route = createFileRoute('/(auth)/login')({
  component: AuthLoginPage,
});
