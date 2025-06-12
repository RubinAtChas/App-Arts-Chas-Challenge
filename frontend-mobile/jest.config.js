module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?|expo-modules-core|@react-native-js-polyfills)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
