import * as yup from 'yup'

export const ConfirmPasswordValidation = yup.object().shape({
  password: yup.string().required('password is required'),
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
