import * as yup from 'yup'

export const validatePassword = yup.object().shape({
  username: yup.string().email('Invalid username'),
  password: yup
    .string()
    .test(
      'match',
      'You can not use your email as password!',
      function (password) {
        return password !== this.parent?.username
      }
    )
    .min(8, 'Password too short!')
    .matches(/\d/, 'Password must include at least one number!')
    .matches(/[a-z]/, 'Password must include at least one lowercase letter!')
    .matches(/[A-Z]/, 'Password must include at least one uppercase letter!')
    .matches(
      /[!"#$%&'()*+,./:;<=>?@[\\\]^_{|}-]+/,
      'Password must include at least one special character!'
    )
    .required('Password is required.'),
})
