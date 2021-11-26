import { queryField, nonNull, list } from 'nexus'

export const CancellationPolicyFindManyQuery = queryField(
  'findManyCancellationPolicy',
  {
    type: nonNull(list(nonNull('CancellationPolicy'))),
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByWithRelationInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CancellationPolicyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancellationPolicy.findMany({
        ...args,
        ...select,
      })
    },
  },
)
