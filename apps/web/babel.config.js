// eslint-disable-next-line func-names
module.exports = function (api) {
  console.log('Setting babel cache on (web)')
  api.cache(true)

  return {
    presets: [['next/babel']],
    plugins: [
      ['import', { libraryName: 'antd', style: true }],
      // ['module-resolver', { alias: { '@': './src' } }],
      // ['add-react-displayname'],
    ],
  }
}
