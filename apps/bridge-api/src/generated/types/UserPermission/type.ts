import { objectType } from 'nexus'

export const UserPermission = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'UserPermission',
  description: `/ The underlying table does not contain a valid unique identifier and can therefore currently not be handled by the Prisma Client.
/ model user_old_passwords {
/ }`,
  definition(t) {
    t.int('id')
    t.nullable.int('user')
    t.nullable.int('page')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('Page', {
      type: 'Page',
      resolve(root: any) {
        return root.Page
      },
    })
  },
})
