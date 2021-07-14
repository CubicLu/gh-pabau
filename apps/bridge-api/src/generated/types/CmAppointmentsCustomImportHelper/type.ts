import { objectType } from 'nexus'

export const CmAppointmentsCustomImportHelper = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CmAppointmentsCustomImportHelper',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.int('custom_appointment_id')
    t.string('custom_contact_name')
    t.string('custom_field_name')
    t.nullable.string('custom_field_value')
    t.int('added')
    t.int('appointment_id')
  },
})
