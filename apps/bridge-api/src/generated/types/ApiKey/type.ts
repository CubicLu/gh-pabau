import { objectType } from 'nexus'

export const ApiKey = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ApiKey',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('api_key')
    t.string('app_type')
    t.field('created_date', { type: 'DateTime' })
    t.int('contacts')
    t.int('bookings')
    t.int('invoices')
    t.int('locations')
    t.int('services')
    t.int('staff')
    t.int('financials')
    t.int('leads')
    t.int('medical_forms')
    t.int('reports')
  },
})
