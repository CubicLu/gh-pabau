import { queryField, list } from 'nexus'

export const CommunicationAggregateQuery = queryField(
  'aggregateCommunication',
  {
    type: 'AggregateCommunication',
    args: {
      where: 'CommunicationWhereInput',
      orderBy: list('CommunicationOrderByWithRelationInput'),
      cursor: 'CommunicationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communication.aggregate({ ...args, ...select }) as any
    },
  },
)
