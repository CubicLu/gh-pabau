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
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CommunicationRecipient', {
      type: 'CommunicationRecipient',
      args: {
        where: 'CommunicationRecipientWhereInput',
        orderBy: 'CommunicationRecipientOrderByWithRelationInput',
        cursor: 'CommunicationRecipientWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationRecipientScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationRecipient
      },
    })
    t.nullable.field('_count', {
      type: 'CommunicationCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
