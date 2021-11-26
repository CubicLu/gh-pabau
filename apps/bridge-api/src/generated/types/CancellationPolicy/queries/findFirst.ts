import { queryField, list } from 'nexus'

export const CancellationPolicyFindFirstQuery = queryField(
  'findFirstCancellationPolicy',
  {
    type: 'CancellationPolicy',
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByWithRelationInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CancellationPolicyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cancellationPolicy.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
