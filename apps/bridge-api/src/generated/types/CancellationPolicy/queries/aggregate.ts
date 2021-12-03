import { queryField, list } from 'nexus'

export const CancellationPolicyAggregateQuery = queryField(
  'aggregateCancellationPolicy',
  {
    type: 'AggregateCancellationPolicy',
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByWithRelationInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancellationPolicy.aggregate({ ...args, ...select }) as any
    },
  },
)
