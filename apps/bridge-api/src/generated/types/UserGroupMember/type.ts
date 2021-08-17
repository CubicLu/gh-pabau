import { objectType } from 'nexus'

export const UserGroupMember = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserGroupMember',
  definition(t) {
    t.int('id')
    t.nullable.int('user_id')
    t.nullable.int('group_id')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('UserGroup', {
      type: 'UserGroup',
      resolve(root: any) {
        return root.UserGroup
      },
    })
  },
})
