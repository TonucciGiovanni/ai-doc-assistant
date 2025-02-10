module.exports = {
    testEnvironment: "jest-environment-jsdom", // For DOM testing
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest', // Use Babel for JS/JSX files
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Optional: For global test setup
  };