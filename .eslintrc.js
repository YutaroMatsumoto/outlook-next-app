// module.exports = {
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     // 'plugin:react-hooks/recommended',
//     'plugin:@typescript-eslint/recommended',
//     'prettier', // prettierのextendsは他のextendsより後に記述する
//     'prettier/@typescript-eslint',
//   ],
//   plugins: ['@typescript-eslint'],
//   parser: '@typescript-eslint/parser',
// }

// 以下について後ほど生部
module.exports = {
  extends: [
    'eslint:recommended',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module', ecmaVersion: 2020 },
  env: { es6: true, node: true, browser: true },
  globals: {},
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 関数の戻り値を明記するか
    '@typescript-eslint/no-empty-function': 'off', //　空の関数の定義を禁止するか
    '@typescript-eslint/ban-ts-comment': 'off', // コメントに関するルール？（https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/ban-ts-comment.md）
    '@next/next/no-img-element': 'off', // imgタグを使用可能にする
  },
  ignorePatterns: ['*.config.js', '*.d.ts', 'generated'],
}
