import { queryField, list } from 'nexus'

export const CommunicationHashAggregateQuery = queryField(
  'aggregateCommunicationHash',
  {
    type: 'AggregateCommunicationHash',
    args: {
      where: 'CommunicationHashWhereInput',
      orderBy: list('CommunicationHashOrderByWithRelationInput'),
      cursor: 'CommunicationHashWhereUniqueInput',
      distinct: 'CommunicationHashScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationHash.aggregate({ ...args, ...select }) as any
    },
  },
)
