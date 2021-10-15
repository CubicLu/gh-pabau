import { queryField, nonNull, list } from 'nexus'

export const CommunicationRecipientFindManyQuery = queryField(
  'findManyCommunicationRecipient',
  {
    type: nonNull(list(nonNull('CommunicationRecipient'))),
    args: {
      where: 'CommunicationRecipientWhereInput',
      orderBy: list('CommunicationRecipientOrderByInput'),
      cursor: 'CommunicationRecipientWhereUniqueInput',
      distinct: 'CommunicationRecipientScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationRecipient.findMany({
        ...args,
        ...select,
      })
    },
  },
)
