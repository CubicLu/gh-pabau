import { objectType } from 'nexus'

export const UserMainPermission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserMainPermission',
  definition(t) {
    t.int('id')
    t.nullable.int('user_id')
    t.boolean('delete_alert_notes')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
