import { objectType } from 'nexus'

export const MediaLlibraryAttachment = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MediaLlibraryAttachment',
  definition(t) {
    t.int('id')
    t.string('file_url')
    t.int('company_id')
    t.int('contact_id')
    t.int('communication_id')
    t.int('medical_form_contact_id')
    t.int('contact_attachment_id')
    t.int('sales_id')
    t.int('statement_id')
    t.field('creation_date', { type: 'DateTime' })
  },
})
