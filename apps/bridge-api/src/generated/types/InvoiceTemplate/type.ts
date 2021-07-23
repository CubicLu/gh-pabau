import { objectType } from 'nexus'

export const InvoiceTemplate = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'InvoiceTemplate',
  definition(t) {
    t.int('id')
    t.string('name')
    t.nullable.int('type')
    t.string('description')
    t.string('style')
    t.string('activity')
    t.string('appearance')
    t.string('payment_information')
    t.string('header')
    t.string('footer')
    t.field('date_created', { type: 'DateTime' })
    t.field('date_updated', { type: 'DateTime' })
    t.int('stripe_button')
    t.nullable.int('company_id')
    t.nullable.field('CompanyDetails', {
      type: 'CompanyDetails',
      resolve(root: any) {
        return root.CompanyDetails
      },
    })
    t.nullable.field('CompanyDetailsDefault', {
      type: 'CompanyDetails',
      resolve(root: any) {
        return root.CompanyDetailsDefault
      },
    })
  },
})
