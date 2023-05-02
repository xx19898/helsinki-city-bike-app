import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: "ts-jest",
    transform: {
      "^.+\\.(ts|tsx)?$": ["ts-jest",{"useESM":"true"}],
      "^.+\\.(js|jsx)$": "babel-jest"
    },
    moduleDirectories:["<rootDir>/../", "node_modules"],
    moduleNameMapper: {
      "^(\\.{1,2}/.*)\\.js$": "$1"
    },
    testEnvironment: "node",
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    extensionsToTreatAsEsm: ['.ts','.tsx'],
//   moduleFileExtensions: ["ts", "js",".tsx",".test.tsx"],
};

export default config;