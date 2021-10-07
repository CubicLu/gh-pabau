import { objectType } from 'nexus'

export const CommunicationProvider = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CommunicationProvider',
  definition(t) {
    t.int('id')
    t.string('code')
    t.string('name')
    t.list.field('Recipient', {
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
        return root.Recipient
      },
    })
    t.nullable.field('_count', {
      type: 'CommunicationProviderCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
