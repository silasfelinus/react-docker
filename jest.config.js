import nextJest from 'next/jest';

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
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/babel-transformer.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(lowdb)/)', // Transform lowdb module
  ],
};

export default createJestConfig(customJestConfig);
