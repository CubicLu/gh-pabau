/* eslint-disable @typescript-eslint/no-var-requires */
const withNx = require('@nrwl/next/plugins/with-nx')
const withPlugins = require('next-compose-plugins')
const withLess = require('next-with-less')
const withYaml = require('next-plugin-yaml')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nxNextConfig = {
  nx: {
    svgr: true,
  },
  cssModules: true,
  webpack5: true,
}

module.exports = withPlugins([
  [withYaml],
  [
    withLess,
    {
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#ff0000' },
      },
    },
  ],
  [withNx, nxNextConfig],
])
