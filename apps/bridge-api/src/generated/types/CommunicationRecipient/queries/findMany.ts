import { queryField, nonNull, list } from 'nexus'

export const CommunicationRecipientFindManyQuery = queryField(
  'findManyCommunicationRecipient',
  {
    type: nonNull(list(nonNull('CommunicationRecipient'))),
    args: {
      where: 'CommunicationRecipientWhereInput',
      orderBy: list('CommunicationRecipientOrderByWithRelationInput'),
      cursor: 'CommunicationRecipientWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationRecipientScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationRecipient.findMany({
        ...args,
        ...select,
      })
    },
  },
)
