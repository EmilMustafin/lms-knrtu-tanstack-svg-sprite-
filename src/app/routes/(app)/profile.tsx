import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@/pages/app/profile';

export const Route = createFileRoute('/(app)/profile')({
  component: ProfilePage,
});
