import { createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import { queryClient } from '@/shared/api/auth-user/query-client';
import { isProduction } from '@/shared/lib';

// set up a Router instance
export const router = createRouter({
  routeTree,
  context: {
    auth: null,
    queryClient: queryClient,
  },
  defaultPreload: 'intent',
  defaultPendingMinMs: 300,
  defaultPendingMs: 100,
  // since we're using React Query, we don't want loader calls to ever be stale
  // this will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  basepath: isProduction ? '/lms-knrtu/' : '/',
});

// register things for typesafety
declare module '@tanstack/react-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    router: typeof router;
  }
}
