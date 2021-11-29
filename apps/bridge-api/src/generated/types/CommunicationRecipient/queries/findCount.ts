import { queryField, nonNull, list } from 'nexus'

export const CommunicationRecipientFindCountQuery = queryField(
  'findManyCommunicationRecipientCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationRecipientWhereInput',
      orderBy: list('CommunicationRecipientOrderByWithRelationInput'),
      cursor: 'CommunicationRecipientWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationRecipientScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationRecipient.count(args as any)
    },
  },
)
