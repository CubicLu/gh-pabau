import { queryField, list } from 'nexus'

export const CommunicationProviderAggregateQuery = queryField(
  'aggregateCommunicationProvider',
  {
    type: 'AggregateCommunicationProvider',
    args: {
      where: 'CommunicationProviderWhereInput',
      orderBy: list('CommunicationProviderOrderByWithRelationInput'),
      cursor: 'CommunicationProviderWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationProvider.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
