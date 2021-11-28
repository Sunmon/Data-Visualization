module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  // "extends": "eslint:recommended",
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {},
};
