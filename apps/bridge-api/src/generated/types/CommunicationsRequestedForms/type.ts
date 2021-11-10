import { objectType } from 'nexus'

export const CommunicationsRequestedForms = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CommunicationsRequestedForms',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('communications_id')
    t.int('booking_id')
    t.int('contact_id')
    t.field('created_date', { type: 'DateTime' })
    t.string('form_ids')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Communication', {
      type: 'Communication',
      resolve(root: any) {
        return root.Communication
      },
    })
    t.field('Booking', {
      type: 'Booking',
      resolve(root: any) {
        return root.Booking
      },
    })
    t.field('CmContact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.CmContact
      },
    })
  },
})
