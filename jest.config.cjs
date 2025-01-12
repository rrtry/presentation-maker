module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // or 'jsdom' if you're testing in a browser-like environment
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Tells Jest to use ts-jest for `.ts` and `.tsx` files
  },
  // Optionally, you can include this to ensure jest works with TypeScript files
  globals: {
    'ts-jest': {
      isolatedModules: true, // speeds up tests by turning off type checking
    },
  },
};
