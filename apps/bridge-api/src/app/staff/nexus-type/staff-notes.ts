import { objectType } from 'nexus'

export const PublicStaffNotesResponse = objectType({
  name: 'Public_StaffNotes',
  definition(t) {
    t.int('ID')
    t.string('Dependents')
  },
})
