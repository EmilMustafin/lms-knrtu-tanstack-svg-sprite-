import fsd from '@feature-sliced/steiger-plugin';
import { defineConfig } from 'steiger';

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export default defineConfig([
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  ...fsd.configs.recommended,
  {
    rules: {
      'fsd/public-api': 'off',
      'fsd/ambiguous-slice-names': 'off',
      'fsd/no-processes': 'off',
    },
  },
]);
