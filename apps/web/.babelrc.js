// .babelrc.js
module.exports = {
  presets: [
    [
      'next/babel',
    ],
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        //libraryDirectory: 'es',
        style: true,
      },
    ],
    // [
    //   'import',
    //   {
    //     libraryName: '@ant-design/icons',
    //     libraryDirectory: 'es',
    //     camel2DashComponentName: false,
    //   },
    //   '@ant-design/icons',
    // ],
  ],
}
