import { queryField, nonNull, list } from 'nexus'

export const CancellationPolicyFindCountQuery = queryField(
  'findManyCancellationPolicyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CancellationPolicyWhereInput',
      orderBy: list('CancellationPolicyOrderByInput'),
      cursor: 'CancellationPolicyWhereUniqueInput',
      distinct: 'CancellationPolicyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cancellationPolicy.count(args as any)
    },
  },
)
