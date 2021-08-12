import { validatePassword, validatePasswordWithConfirm } from './password'

describe('yup', () => {
  it('should fail on weak passwords', () => {
    expect(validatePassword.isValid('abc')).resolves.toBe(false)
    expect(validatePassword.isValid('Abc.123')).resolves.toBe(false)
    expect(validatePassword.isValid('')).resolves.toBe(false)
    expect(validatePassword.isValid(' ')).resolves.toBe(false)
    expect(
      validatePassword.isValid('passwordpasswordpasswordpasswordpassword')
    ).resolves.toBe(false)
  })

  it('password input with confirm should fail when mismatched', () => {
    expect(
      validatePasswordWithConfirm.isValid({
        password: 'abc',
        confirmPassword: '',
      })
    ).resolves.toBe(false)
    expect(
      validatePasswordWithConfirm.isValid({
        password: 'abc',
        confirmPassword: '',
      })
    ).resolves.toBe(false)
    expect(
      validatePasswordWithConfirm.isValid({
        password: 'SuperSecure$123_nfje90wfjerij',
        confirmPassword: 'SuperSecure$123_nfje90wfjerij___DIFFERENT',
      })
    ).resolves.toBe(false)
  })
})
