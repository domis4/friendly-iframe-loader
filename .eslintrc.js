module.exports = {
  parser: '@babel/eslint-parser',
  plugins: ['react', 'jest'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: ['wnderlvst', 'plugin:react/recommended'],
  settings: {
    react: {
      version: '16.10.2'
    }
  },
  globals: {
    PRODUCTION: 'readable'
  },
  rules: {
    'react/prop-types': 0
  },
  env: {
    'jest/globals': true
  }
}
