module.exports = {
  extends: 'erb/typescript',
  rules: {
    'import/no-extraneous-dependencies': 'off'
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    }
  }
}
