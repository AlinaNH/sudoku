import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    coverage: {
      exclude: [
        'vitest.config.ts',
        'nuxt.config.ts',
        '.nuxt',
        'node_modules',
        'virtual:nuxt:',
        'tests',
      ],
      enabled: true,
    },
  },
});