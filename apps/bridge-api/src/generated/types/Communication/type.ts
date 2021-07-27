import { objectType } from 'nexus'

export const Communication = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Communication',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('from_address')
    t.int('uid')
    t.int('location_id')
    t.field('type', { type: 'communications_type' })
    t.boolean('secure')
    t.field('date', { type: 'DateTime' })
    t.int('communications_content_id')
    t.nullable.int('related_id')
    t.nullable.field('related_type', { type: 'communications_related_type' })
    t.field('Content', {
      type: 'CommunicationContent',
      resolve(root: any) {
        return root.Content
      },
    })
    t.field('Recipient', {
      type: 'CommunicationRecipient',
      resolve(root: any) {
        return root.Recipient
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
