export default {
    // Otras configuraciones de Jest...
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    },
    testEnvironment: 'jsdom',
   
  };