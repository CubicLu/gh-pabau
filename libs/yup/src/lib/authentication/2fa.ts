import * as yup from 'yup'

export const twoFactorAuth = yup
  .string()
  .test('len', 'Must be exactly 6 characters', (val) => val?.length === 6)
