import { objectType } from 'nexus'

export const StaffServices = objectType({
  name: 'StaffServices',
  definition(t) {
    t.int('id')
  },
})
