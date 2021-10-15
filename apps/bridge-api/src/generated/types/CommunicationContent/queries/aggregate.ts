import { queryField, list } from 'nexus'

export const CommunicationContentAggregateQuery = queryField(
  'aggregateCommunicationContent',
  {
    type: 'AggregateCommunicationContent',
    args: {
      where: 'CommunicationContentWhereInput',
      orderBy: list('CommunicationContentOrderByInput'),
      cursor: 'CommunicationContentWhereUniqueInput',
      distinct: 'CommunicationContentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationContent.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
