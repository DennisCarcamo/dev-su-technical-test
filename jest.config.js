module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.js"],
  moduleFileExtensions: ["ts", "html", "js", "json", "css", "scss"],
  transform: {
    "^.+\\.(ts|html)$": "ts-jest",
  },
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  moduleNameMapper: {
    "^.+\\.(html|css|scss)$": "jest-transform-stub",
  },
  transformIgnorePatterns: ["node_modules/(?!(?:@angular|rxjs|tslib)/)"],
};
