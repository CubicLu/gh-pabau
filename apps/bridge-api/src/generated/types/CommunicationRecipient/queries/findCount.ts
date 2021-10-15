import { queryField, nonNull, list } from 'nexus'

export const CommunicationRecipientFindCountQuery = queryField(
  'findManyCommunicationRecipientCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationRecipientWhereInput',
      orderBy: list('CommunicationRecipientOrderByInput'),
      cursor: 'CommunicationRecipientWhereUniqueInput',
      distinct: 'CommunicationRecipientScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationRecipient.count(args as any)
    },
  },
)
