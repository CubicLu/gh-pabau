/* eslint-disable @typescript-eslint/no-var-requires */
const withAntdLess = require('next-plugin-antd-less')
const withImages = require('next-images')
const withNx = require('@nrwl/next/plugins/with-nx')

module.exports = {
  experimential: {
    cpus: 1,
  },
  env: {
    google_api_key: 'AIzaSyC43U2-wqXxYEk1RBrTLdkYt3aDoOxO4Fw',
    api_key: 'AIzaSyB220K3PhuJAa14W5YmpJwzXBYgPyT0BGk',
    client_id:
      '312504164675-a6m5avc8ampbs9dshepb3dkbgvqbtaqa.apps.googleusercontent.com',
  },
  async rewrites() {
    return [
      {
        source: '/reports/:name',
        destination: '/reports/[name]?name=:name',
      },
      {
        source: '/clients/:id',
        destination: '/clients/[id]?id=:id',
      },
      {
        source: '/clients/finance/invoice/:id',
        destination: '/clients/finance/invoice/[id]?id=:id',
      },
      {
        source: '/clients/finance/receipt/:id',
        destination: '/clients/finance/receipt/[id]?id=:id',
      },
      {
        source: '/clients/finance/statement/:id',
        destination: '/clients/finance/statement/[id]?id=:id',
      },
      {
        source: '/test-form/:form_id/:client_id',
        destination:
          '/test-form/[form_id]/[client_id]?form_id=:form_id&client_id=:client_id',
      },
      {
        source: '/clients/:id/financial',
        destination: '/clients/[id]/financial?id=:id',
      },
    ]
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 60 * 60 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 6,
  },
  eslint: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    // !! WARN !!
    build: false,
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
