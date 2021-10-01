const withAntdLess = require('next-plugin-antd-less')
const withImages = require('next-images')
const withNx = require('@nrwl/next/plugins/with-nx')

module.exports = {
  env: {
    google_api_key: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw',
  },
  async rewrites() {
    return [
      {
        source: '/online-bookings/:company_slug',
        destination: '/reports/[company_slug]?company_slug=:company_slug',
      },
    ]
  },
  trailingSlash: false,
  ...withImages({
    fileExtensions: [
      'jpg',
      'jpeg',
      'png',
      'gif',
      'ico',
      'webp',
      'jp2',
      'avif',
      'woff',
      'woff2',
      'otf',
    ],
    inlineImageLimit: 9_000,
    ...withAntdLess({
      lessVarsFilePath: 'libs/ui/src/styles/antd.less',
      importLoaders: 3,
      cssLoaderOptions: {
        sourceMap: true,
        esModule: true,
        modules: {
          exportLocalsConvention: 'camelCase',
          // exportOnlyLocals: false,
          mode: 'local',
        },
      },
      ...withNx({
        cssModules: false,
        webpack(config, options) {
          config.module.rules.push(
            {
              test: /\.graphql$/,
              exclude: /node_modules/,
              use: [
                options.defaultLoaders.babel,
                { loader: 'graphql-let/loader' },
              ],
            },
            {
              test: /\.graphqls$/,
              exclude: /node_modules/,
              use: ['graphql-let/schema/loader'],
            },
            {
              test: /\.ya?ml$/,
              type: 'json',
              use: 'yaml-loader',
            }
          )

          return config
        },
      }),
    }),
  }),
}
