import * as yup from 'yup'

export const ResetPasswordValidation = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
})
