import { createFileRoute } from '@tanstack/react-router';
import { Signup } from '../../../pages/auth';

export const Route = createFileRoute('/(auth)/signup')({
  component: Signup,
});
