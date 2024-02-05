import type {Config} from 'jest';

const config: Config = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/src/test/jest-setup.ts'],
  setupFilesAfterEnv: ['@testing-library/react-native/extend-expect'],
  moduleDirectories: ['node_modules', './src/test'],
  collectCoverageFrom: [
    'src/{components,utils,hooks,domain,screens}/**/*.{js,jsx,ts,tsx}',
  ],
  coveragePathIgnorePatterns: ['/node_modules', 'index'],
  modulePathIgnorePatterns: ['.*/mockedData/.*'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-safe-area-context|@react-navigation)/)',
  ],
};

export default config;
