// eslint-disable-next-line @typescript-eslint/no-var-requires
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rootWebpackConfig = require('../../../.storybook/webpack.config')

// const lessToJs = require('less-vars-to-js')
// const fs = require('fs')
// const path = require('path')

// Read the less file in as string
// const paletteLess = fs.readFileSync(
//   path.resolve(__dirname, '../src/styles/antd.less'),
//   'utf8'
// )

// Pass in file contents
// const lessVars = lessToJs(paletteLess, {
//   resolveVariables: true,
//   stripPrefix: true,
// })

/**
 * Export a function. Accept the base config as the only param.
 *
 * @param {Parameters<typeof rootWebpackConfig>[0]} options
 */
module.exports = async ({ config, mode }) => {
  config = await rootWebpackConfig({ config, mode })

  const tsPaths = new TsconfigPathsPlugin({
    configFile: './tsconfig.base.json',
  })

  config.resolve.plugins
    ? config.resolve.plugins.push(tsPaths)
    : (config.resolve.plugins = [tsPaths])

  // Found this here: https://github.com/nrwl/nx/issues/2859
  // And copied the part of the solution that made it work

  const svgRuleIndex = config.module.rules.findIndex((rule) => {
    const { test } = rule

    return test.toString().startsWith('/\\.(svg|ico')
  })
  config.module.rules[
    svgRuleIndex
  ].test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/

  config.module.rules.push({
    test: /\.module\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          localsConvention: 'camelCase',
          modules: {
            mode: 'local',
            localIdentName: '[local]--[hash:base64:5]',
          },
        },
      },
      {
        loader: 'less-loader',
        options: {
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
    //include: path.resolve(__dirname, '../src/'),
  })

  config.module.rules.push({
    test: /\.less$/,
    exclude: /\.module\.less$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {},
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
            // modifyVars: lessVars,
          },
        },
      },
    ],
    //include: path.resolve(__dirname, '../src/'),
  })

  config.module.rules.push(
    // {
    //   test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
    //   use: {
    //     loader: 'url-loader',
    //     options: {
    //       limit: 100000
    //     }
    //   }
    // },
    {
      test: /\.svg$/,
      oneOf: [
        // If coming from JS/TS file, then transform into React component using SVGR.
        {
          issuer: {
            test: /\.[jt]sx?$/,
          },
          use: [
            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000, // 10kB
                name: '[name].[hash:7].[ext]',
                esModule: false,
              },
            },
          ],
        },
        // Fallback to plain URL loader.
        {
          use: [
            {
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000, // 10kB
                name: '[name].[hash:7].[ext]',
              },
            },
          ],
        },
      ],
    }
  )

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            corejs: false,
            helpers: true,
            regenerator: true,
            useESModules: false,
            version: '7.12.5',
          },
        ],
        //["import", { libraryName: "antd", style: true }]
      ],
      // presets: [require.resolve('babel-preset-react-app')],
    },
  })

  config.resolve.extensions.push('.ts', '.tsx')
  // Remove original less loader

  // config.module.rules = config.module.rules.filter((f) => {
  //   console.log('IS THIS LESS?', f.test)
  //   return f.test.toString() !== '/\\.less$/'
  // })

  config.devtool = 'inline-source-map'

  //config.cssModules = true;

  return config
}
