module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/components/**/*.vue',
    '<rootDir>/pages/**/*.vue',
    '<rootDir>/tests/**/*.ts',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!vuetify)'],
  testEnvironment: 'jest-environment-jsdom-latest',
  // setupFiles: ['<rootDir>/tests/unit/index.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
}
