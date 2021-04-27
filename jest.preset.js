const nxPreset = require('@nrwl/jest/preset')

module.exports = {
  ...nxPreset,
  verbose: true,
  errorOnDeprecated: true,
  maxWorkers: '50%',
  passWithNoTests: true,
  forceExit: true,
}
