/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins')
const withNx = require('@nrwl/next/plugins/with-nx')
const withLess = require('next-with-less')
const withYaml = require('next-plugin-yaml')
const removeImports = require('next-remove-imports')
const withBundleAnalyzer = require('@next/bundle-analyzer')

module.exports = withPlugins([
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
        localsConvention: 'camelcase', // Not Working
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#ff0000' },
        exportLocalsConvention: 'camelCase',
        lessOptions: {
          localsConvention: 'camelcase', // Not Working
          javascriptEnabled: true,
          modifyVars: { '@primary-color': '#ff0000' },
          exportLocalsConvention: 'camelCase',
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
])
