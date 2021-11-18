/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('next-plugin-antd-less')
const withYaml = require('next-plugin-yaml')
const withBundleAnalyzer = require('@next/bundle-analyzer')
const withImages = require('next-images')

module.exports = withPlugins(
  [
    [
      withBundleAnalyzer,
      {
        enabled: process.env.ANALYZE === 'true',
      },
    ],
    [withYaml],
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
    [
      withLess,
      {
        importLoaders: 3,
        cssLoaderOptions: {
          sourceMap: true,
          esModule: true,
          modules: {
            exportLocalsConvention: 'camelCase',
            mode: 'local',
          },
        },
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
              '@primary-color': '#54b2d3',
              '@link-color': '#1890ff',
              '@primary-info-color': ' #e2f6f5',
              '@success-color': '#52c41a',
              '@warning-color': '#faad14',
              '@error-color': '#f5222d',
              '@red-color-text': '#ff5b64',
              '@blue-color-text': '#6383f1',
              '@font-size-base': '14px',
              '@heading-color': 'rgba(0, 0, 0, 0.85)',
              '@text-color': 'rgba(0, 0, 0, 0.65)',
              '@text-color-secondary': 'rgba(0, 0, 0, 0.45)',
              '@disabled-color': 'rgba(0, 0, 0, 0.25)',
              '@light-color': '#ffffff',
              '@red-focused-color': '#df562b',
              '@green-primary-color': '#65cd98',
              '@blue-focused-color': '#eef7fb',
              '@border-color-base': '#ecedf0',
              '@gray-background-color': '#ecedf070',
              '@gray-background-light-color': '#fcfcfc',
              '@box-shadow-base':
                '0 3px 6px -4px rgba(0, 0, 0, 0.12),0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
              '@font-variant-base': 'normal',
              '@font-feature-settings-base': 'normal',
              '@font-family': 'Circular-Std-Book, -apple-system, sans-serif,',
            },
          },
        },
      },
    ],
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
        inlineImageLimit: false,
      },
    ],
  ],
  {
    images: {
      disableStaticImages: true,
    },
    experimential: {
      cpus: 1,
      esmExternals: false,
    },
    eslint: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has ESLint errors.
      // !! WARN !!
      build: false,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
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
        {
          source: '/journey/:id',
          destination: '/journey/[journey-id]?journey-id=:id',
        },
      ]
    },
    onDemandEntries: {
      // period (in ms) where the server will keep pages in the buffer
      maxInactiveAge: 25 * 60 * 60 * 1000,
      // number of pages that should be kept simultaneously without being disposed
      pagesBufferLength: 6,
    },
    trailingSlash: false,
  }
)
