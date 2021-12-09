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
    t.nullable.field('Content', {
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
    t.list.field('CommunicationAttachment', {
      type: 'CommunicationAttachment',
      args: {
        where: 'CommunicationAttachmentWhereInput',
        orderBy: 'CommunicationAttachmentOrderByWithRelationInput',
        cursor: 'CommunicationAttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationAttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationAttachment
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
    t.list.field('CommunicationsRequestedForms', {
      type: 'CommunicationsRequestedForms',
      args: {
        where: 'CommunicationsRequestedFormsWhereInput',
        orderBy: 'CommunicationsRequestedFormsOrderByWithRelationInput',
        cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationsRequestedFormsScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationsRequestedForms
      },
    })
    t.nullable.field('Users', {
      type: 'User',
      resolve(root: any) {
        return root.Users
      },
    })
    t.field('_count', {
      type: 'CommunicationCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
