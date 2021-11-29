import { queryField, list } from 'nexus'

export const CommunicationRecipientAggregateQuery = queryField(
  'aggregateCommunicationRecipient',
  {
    type: 'AggregateCommunicationRecipient',
    args: {
      where: 'CommunicationRecipientWhereInput',
      orderBy: list('CommunicationRecipientOrderByWithRelationInput'),
      cursor: 'CommunicationRecipientWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationRecipient.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
