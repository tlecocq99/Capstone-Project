export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": [
      "babel-jest",
      { presets: ["@babel/preset-react", "@babel/preset-env"] },
    ],
  },
  extensionsToTreatAsEsm: [".jsx"],
  moduleFileExtensions: ["js", "jsx"],
};
