import { validatePassword } from './password'

describe('yup', () => {
  it('should fail on invalid emails', () => {
    expect(validatePassword.isValid('a@a')).resolves.toBe(false)
    expect(validatePassword.isValid('Abc.123')).resolves.toBe(false)
    expect(validatePassword.isValid('')).resolves.toBe(false)
    expect(validatePassword.isValid(' ')).resolves.toBe(false)
    expect(validatePassword.isValid('test @ gmail.com')).resolves.toBe(false)
  })
})
