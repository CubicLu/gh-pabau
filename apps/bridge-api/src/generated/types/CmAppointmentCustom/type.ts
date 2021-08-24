import { objectType } from 'nexus'

export const CmAppointmentCustom = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmAppointmentCustom',
  definition(t) {
    t.int('id')
    t.int('appointment_id')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('custom_field_id')
    t.string('custom_field_value')
    t.int('imported')
  },
})
