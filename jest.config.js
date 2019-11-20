module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  roots: ['src'],
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: [
    '.d.ts$',
    '.spec.ts',
    'src/index.ts',
    'src/config',
    'connection/database',
    'connection/server'
  ],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['./tests/setup.ts'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  moduleNameMapper: {
    '@app': '<rootDir>/src/index.ts',
    // '@api/(.*)': '<rootDir>/src/api/$1',
    '@config': '<rootDir>/src/config',
    '@tests': '<rootDir>/src/tests',
    '@util': './src/utils'
  }
};
