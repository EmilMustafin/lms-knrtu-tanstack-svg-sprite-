import { createFileRoute, redirect } from '@tanstack/react-router';
import { HomePage } from '../../pages/home';
import { Footer, Header } from '../../widgets/layout';

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (context) {
      redirect({
        to: '/app',
        throw: true,
      });
    }
  },
  component: () => (
    <main>
      <Header />
      <HomePage />
      <Footer />
    </main>
  ),
});
