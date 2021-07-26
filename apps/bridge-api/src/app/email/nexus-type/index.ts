import { objectType, inputObjectType } from 'nexus'

export const EmailNexusOutput = objectType({
  name: 'EmailNexusOutput',
  definition(t) {
    t.boolean('success')
  },
})

export const DynamicTemplateData = inputObjectType({
  name: 'DynamicTemplateData',
  definition(t) {
    t.nonNull.string('key')
    t.nonNull.string('value')
  },
})

export const EmailRelationData = inputObjectType({
  name: 'EmailRelationData',
  definition(t) {
    t.int('contact_id')
    t.int('lead_id')
    t.int('staff_id')
    t.int('booking_id')
    t.int('invoice_id')
  },
})
