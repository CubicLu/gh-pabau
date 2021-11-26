import { queryField, list } from 'nexus'

export const CommunicationContentAggregateQuery = queryField(
  'aggregateCommunicationContent',
  {
    type: 'AggregateCommunicationContent',
    args: {
      where: 'CommunicationContentWhereInput',
      orderBy: list('CommunicationContentOrderByWithRelationInput'),
      cursor: 'CommunicationContentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationContent.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
