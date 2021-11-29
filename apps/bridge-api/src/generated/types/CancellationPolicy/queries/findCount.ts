import { queryField, nonNull, list } from 'nexus'

export const CancellationPolicyFindCountQuery = queryField(
  'findManyCancellationPolicyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByWithRelationInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CancellationPolicyScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancellationPolicy.count(args as any)
    },
  },
)
