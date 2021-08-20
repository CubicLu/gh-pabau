import { objectType } from 'nexus'

export const PasswordResetAuth = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PasswordResetAuth',
  definition(t) {
    t.int('id')
    t.string('key_code')
    t.string('username')
    t.string('old_password')
    t.nullable.field('date', { type: 'DateTime' })
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
