// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: {
    tsconfigPath: 'tsconfig.json',
    strict: true,
  },
  rules: {
    // 这里可以覆盖或添加你想要的规则，比如：
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'warn',
  },
})
