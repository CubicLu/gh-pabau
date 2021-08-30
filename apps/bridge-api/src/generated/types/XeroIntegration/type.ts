import { objectType } from 'nexus'

export const XeroIntegration = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'XeroIntegration',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('client_id')
    t.string('tenant_id')
    t.string('client_secret')
    t.string('refresh_token')
    t.string('redirect_uri')
    t.nullable.string('default_tax_method')
    t.string('payments_account_code')
    t.string('items_account_code')
    t.boolean('payments_enabled')
    t.boolean('tracking_categories_enabled')
    t.string('default_invoice_status')
    t.boolean('enabled')
    t.field('created_at', { type: 'DateTime' })
    t.nullable.field('modified_at', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
