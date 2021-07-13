import { objectType } from 'nexus'

export const StaffMeta = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'StaffMeta',
  definition(t) {
    t.int('id')
    t.nullable.int('staff_id')
    t.nullable.string('meta_name')
    t.nullable.string('meta_value')
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
  },
})
