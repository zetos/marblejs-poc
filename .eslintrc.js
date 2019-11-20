module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
    parserOptions: {
      ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
      sourceType: "module" // Allows for the use of imports
    }
  };