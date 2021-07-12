import { queryField, list } from 'nexus'

export const CancellationPolicyAggregateQuery = queryField(
  'aggregateCancellationPolicy',
  {
    type: 'AggregateCancellationPolicy',
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      distinct: 'CancellationPolicyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancellationPolicy.aggregate({ ...args, ...select }) as any
    },
  },
)
