import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    exclude: ['src/app/app.component.testing-library.spec.ts'],
    css: true,
    restoreMocks: true,
    coverage: {
      include: ['src/app/**/*.ts'],
      exclude: [
        '**/*.spec.ts',
        '**/*.types.ts',
        '**/*.interface.ts',
        '**/*.interfaces.ts',
        '**/*.model.ts',
        '**/index.ts',
        '**/*.stories.ts',
        '**/storybook-static/**',
        '**/dist/**',
        '**/coverage/**',
        '**/.storybook/**',
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },
  },
});
