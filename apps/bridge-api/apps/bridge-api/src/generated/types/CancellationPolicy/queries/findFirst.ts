import { queryField, list } from 'nexus'

export const CancellationPolicyFindFirstQuery = queryField(
  'findFirstCancellationPolicy',
  {
    type: 'CancellationPolicy',
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByWithRelationInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      distinct: 'CancellationPolicyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancellationPolicy.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
