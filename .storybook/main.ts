import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../libs/ui/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/angular',
  webpackFinal: async (webpackConfig) => {
    webpackConfig.performance = { hints: false };
    return webpackConfig;
  },
};
export default config;
