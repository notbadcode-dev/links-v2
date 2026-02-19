# Storybook Testing (UI libs)

## Current setup

- `@storybook/test-runner` executes Storybook stories as tests.
- Stories can define `play` functions with assertions from `storybook/test`.

## Commands

- `npm run storybook`: start Storybook on `http://127.0.0.1:6006`
- `npm run test:stories`: run story tests against running Storybook
- `npm run test:stories:watch`: watch mode for story tests
- `npm run test:stories:smoke`: run render/smoke coverage for stories excluding `interaction`-tagged stories
- `npm run test:stories:interaction`: run only stories tagged with `interaction`
- `npm run test:stories:smoke:ci`: CI-mode smoke test command for pre-served Storybook
- `npm run test:stories:interaction:ci`: CI-mode interaction test command for pre-served Storybook
- `npm run test:stories:ci`: build static Storybook, serve it, and run tests in CI mode

## Story tags

- Use `tags: ['interaction']` on stories with `play` assertions that should run in interaction test jobs.
- Stories without the `interaction` tag are covered by smoke tests.

## Notes about Vitest addon

The `@storybook/addon-vitest` integration in Storybook 10 currently targets Vite-based frameworks.
This workspace uses `@storybook/angular` with Webpack builder, so the compatible path today is `@storybook/test-runner`.
