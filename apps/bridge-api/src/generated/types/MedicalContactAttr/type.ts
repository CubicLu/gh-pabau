import { objectType } from 'nexus'

export const MedicalContactAttr = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MedicalContactAttr',
  definition(t) {
    t.int('id')
    t.int('attr_id')
    t.int('contact_id')
    t.nullable.string('value')
    t.nullable.field('updated_at', { type: 'DateTime' })
    t.nullable.field('created_at', { type: 'DateTime' })
    t.nullable.field('deleted_at', { type: 'DateTime' })
    t.nullable.int('nhs_locum_id')
    t.nullable.string('group_label')
    t.int('medical_form_contact_id')
    t.float('attachment_size')
    t.string('custom_contact_name')
    t.int('custom_contact_id')
    t.field('MedicalFormContact', {
      type: 'MedicalFormContact',
      resolve(root: any) {
        return root.MedicalFormContact
      },
    })
  },
})
