import { objectType } from 'nexus'

export const MedicalFormContactHistory = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalFormContactHistory',
  definition(t) {
    t.int('id')
    t.string('mode')
    t.int('medical_form_contact_id')
    t.int('user_id')
    t.int('contact_id')
    t.nullable.int('company_id')
    t.field('date', { type: 'DateTime' })
    t.nullable.string('update_changes')
    t.nullable.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('MedicalFormContact', {
      type: 'MedicalFormContact',
      resolve(root: any) {
        return root.MedicalFormContact
      },
    })
  },
})
