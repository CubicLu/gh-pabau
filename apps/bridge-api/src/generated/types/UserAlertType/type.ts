import { objectType } from 'nexus'

export const UserAlertType = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserAlertType',
  definition(t) {
    t.int('id')
    t.int('uid')
    t.string('cc_name')
    t.string('cc_email')
    t.string('cc_phone')
    t.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
