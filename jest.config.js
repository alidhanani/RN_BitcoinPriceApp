module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/react-native/jest-preset'],
    testEnvironment: 'node',
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@expo|expo(nent)?|@sentry/.*)',
    ],
  };
  