// eslint-disable-next-line func-names
module.exports = function (api) {
  console.log('Setting babel cache on')
  api.cache(true)

  return { presets: ['@nrwl/web/babel'], babelrcRoots: ['*'], plugins: [] }
}
