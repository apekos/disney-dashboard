module.exports = {
  transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};
