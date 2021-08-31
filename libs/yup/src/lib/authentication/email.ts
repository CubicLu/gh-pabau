import * as yup from 'yup'

export const validateEmail = yup
  .string()
  .email('Contains invalid email address.')
