module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest',  // Byt från ts-jest till babel-jest om du mest har JS/JSX-filer
    },
    transformIgnorePatterns: [
      // Ignore node_modules MEN undanta följande paket som måste transformeras:
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?|expo-modules-core|@react-native-js-polyfills)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };
  