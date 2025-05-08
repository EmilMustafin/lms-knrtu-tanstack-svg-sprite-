import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevelopmentTools } from '../../shared/config/developmentTools';
import { AuthStoreState } from '@/entities/user/auth/model/store';

export type TRouterContext = {
  auth: AuthStoreState | null;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<TRouterContext>()({
  component: RootComponent,
  notFoundComponent: () => <div>Not Found</div>,
  errorComponent: () => <div>Error</div>,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevelopmentTools
        position="bottom-left"
        initialIsOpen={false}
      />
    </>
  );
}
