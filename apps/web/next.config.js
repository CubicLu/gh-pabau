/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('next-with-less')
const withYaml = require('next-plugin-yaml')
const removeImports = require('next-remove-imports')
const withBundleAnalyzer = require('@next/bundle-analyzer')
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
      withLess,
      {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#ff' },
            localsConvention: 'camelCase',
            exportLocalsConvention: 'camelCase',
          },
        },
        cssLoaderOptions: {
          sourceMap: true,
          esModule: true,
          modules: {
            localsConvention: 'camelCase',
            // exportOnlyLocals: false,
            mode: 'local',
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
    cssLoaderOptions: {
      sourceMap: true,
      esModule: true,
      modules: {
        localsConvention: 'camelCase',
        // exportOnlyLocals: false,
        mode: 'local',
      },
    },
  }
)
