import { objectType } from 'nexus'

export const CommunicationRecipient = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CommunicationRecipient',
  definition(t) {
    t.int('id')
    t.int('communications_id')
    t.int('recipient_id')
    t.field('recipient_type', {
      type: 'communications_recipients_recipient_type',
    })
    t.nullable.string('remote_key')
    t.nullable.string('delivered_result')
    t.nullable.int('read_count')
    t.string('to_address')
    t.string('cc')
    t.int('provider_id')
    t.nullable.field('status', { type: 'communications_recipients_status' })
    t.string('merge_values')
    t.field('Provider', {
      type: 'CommunicationProvider',
      resolve(root: any) {
        return root.Provider
      },
    })
    t.list.field('Hash', {
      type: 'CommunicationHash',
      args: {
        where: 'CommunicationHashWhereInput',
        orderBy: 'CommunicationHashOrderByWithRelationInput',
        cursor: 'CommunicationHashWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationHashScalarFieldEnum',
      },
      resolve(root: any) {
        return root.Hash
      },
    })
    t.nullable.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.nullable.field('Lead', {
      type: 'CmLead',
      resolve(root: any) {
        return root.Lead
      },
    })
    t.nullable.field('Communication', {
      type: 'Communication',
      resolve(root: any) {
        return root.Communication
      },
    })
    t.field('_count', {
      type: 'CommunicationRecipientCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
