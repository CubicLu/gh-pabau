import * as yup from 'yup'
import yupPassword from 'yup-password'

yupPassword(yup)

export const validatePassword = yup.string().password().required()

export const validatePasswordWithConfirm = yup.object().shape({
  password: validatePassword,
  confirmPassword: yup
    .string()
    .required('confirm password is required')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf(
          [yup.ref('password')],
          'password & confirm password both need to be the same'
        ),
    }),
})
