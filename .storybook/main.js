module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    'storybook-addon-i18next/register',
    '@storybook/addon-actions',
  ],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },
  babel: async (options) => {
    const { plugins = [] } = options
    return {
      ...options,
      plugins: [
        ...plugins,
        [
          require.resolve('@babel/plugin-proposal-private-property-in-object'),
          { loose: true },
        ],
      ]
    }
  },
}
