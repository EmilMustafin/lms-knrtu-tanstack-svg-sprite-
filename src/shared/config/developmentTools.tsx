import { lazy } from 'react';
import { isDevelopment } from '../lib';

export const ReactHookFormDevelopmentTools = !isDevelopment
  ? (): null => null
  : lazy(() =>
      import('@hookform/devtools').then((result) => ({
        default: result.DevTool,
      })),
    );

export const TanStackRouterDevelopmentTools = !isDevelopment
  ? (): null => null
  : lazy(() =>
      import('@tanstack/router-devtools').then((result) => ({
        default: result.TanStackRouterDevtools,
      })),
    );

export const TanStackReactQueryDevelopmentTools = !isDevelopment
  ? (): null => null
  : lazy(() =>
      import('@tanstack/react-query-devtools').then((result) => ({
        default: result.ReactQueryDevtools,
      })),
    );
