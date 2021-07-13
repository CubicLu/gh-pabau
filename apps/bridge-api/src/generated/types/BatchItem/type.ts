import { objectType } from 'nexus'

export const BatchItem = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BatchItem',
  definition(t) {
    t.int('id')
    t.int('batch_id')
    t.int('company_id')
    t.int('product_id')
    t.field('usage_date', { type: 'DateTime' })
    t.int('patient_id')
    t.int('created_by_id')
    t.int('qty')
    t.int('appointment_id')
    t.int('batch_flag')
  },
})
