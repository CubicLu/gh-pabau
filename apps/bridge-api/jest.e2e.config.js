// eslint-disable-next-line no-undef
module.exports = {
  displayName: 'bridge-api',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  testMatch: ['**/+(*.)+(e2e-spec|e2e-test|spec|test).+(ts|js)?(x)'],
  roots: ['specs/integration'],
  resolver: '@nrwl/jest/plugins/resolver',
  coverageReporters: ['html'],
}
