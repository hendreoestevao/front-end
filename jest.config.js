module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['<rootDir>/src/**.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  transform: {
    '\\.ts$': 'ts-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testEnvironment: 'jsdom'
}
