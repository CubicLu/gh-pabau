import { objectType } from 'nexus'

export const ContactPreference = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ContactPreference',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.int('contact_id')
    t.nullable.int('family')
    t.nullable.int('emergency_contact')
    t.nullable.int('next_of_kin')
    t.nullable.int('insurance_provider')
    t.nullable.int('gp')
    t.nullable.int('company')
    t.nullable.int('book_appointments')
    t.nullable.int('book_class')
    t.nullable.int('loyalty')
    t.nullable.int('my_packages')
    t.nullable.int('purchase_package')
    t.nullable.int('payments')
    t.nullable.int('appointments')
    t.nullable.int('class')
    t.nullable.int('documents')
    t.nullable.int('medications')
    t.nullable.int('allergies')
    t.nullable.int('gp_details')
    t.nullable.string('share_link')
    t.nullable.string('access_code')
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
  },
})
