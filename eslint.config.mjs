import { antfu } from '@antfu/eslint-config'

export default antfu({
  rules: {
    'node/prefer-global/process': 'off',
    'ts/consistent-type-imports': 'off',
    'no-console': 'off',
  },
})
