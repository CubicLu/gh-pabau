/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('next-plugin-antd-less')
const withYaml = require('next-plugin-yaml')
const removeImports = require('next-remove-imports')
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

    [
      removeImports,
      {
        experimental: { esmExternals: true },
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
  }
)
