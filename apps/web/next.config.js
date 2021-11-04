/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('next-plugin-antd-less')
const withYaml = require('next-plugin-yaml')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withImages = require('next-images')
// const path = require('path')

// const pathToLessFileWithVariables = path.resolve('libs/ui/src/styles/antd.less')
module.exports = withPlugins(
  [
    // https://www.npmjs.com/package/@next/bundle-analyzer
    [
      withBundleAnalyzer,
      {
        enabled: process.env.ANALYZE === 'true',
      },
    ],
    [withYaml],
    [
      withImages,
      {
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
        inlineImageLimit: 8192,
      },
    ],
    [
      withLess,
      {
        cssLoaderOptions: {
          sourceMap: true,
          esModule: true,
          modules: {
            exportLocalsConvention: 'camelCase',
            // exportOnlyLocals: false,
            mode: 'local',
          },
        },
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#fff' },
          },
        },
      },
    ],
    [
      withNx,
      {
        nx: {
          svgr: true,
        },
        cssModules: true,
        webpack5: true,
      },
    ],
  ],
  {
    images: {
      disableStaticImages: true,
    },
    experimential: {
      cpus: 1,
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
  }
)
