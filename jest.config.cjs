const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/babel-jest-transformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lowdb)/)', // Add your module here
  ],
};

module.exports = createJestConfig(customJestConfig);
