import * as yup from 'yup'

export const LoginValidation = yup.object({
  email: yup.string().email('Invalid work email').required('Email is required'),
  password: yup.string().required('Password is required'),
})
