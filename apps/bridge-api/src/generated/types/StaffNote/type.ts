import { objectType } from 'nexus'

export const StaffNote = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'StaffNote',
  definition(t) {
    t.int('ID')
    t.int('StaffID')
    t.string('Dependents')
    t.string('Education')
    t.string('Hobbies')
    t.string('Training')
    t.string('Volunteer')
    t.string('Prescription')
    t.nullable.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
  },
})
