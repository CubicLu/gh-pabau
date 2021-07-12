import { queryField, nonNull, list } from 'nexus'

export const CancellationPolicyFindManyQuery = queryField(
  'findManyCancellationPolicy',
  {
    type: nonNull(list(nonNull('CancellationPolicy'))),
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      distinct: 'CancellationPolicyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancellationPolicy.findMany({
        ...args,
        ...select,
      })
    },
  },
)
