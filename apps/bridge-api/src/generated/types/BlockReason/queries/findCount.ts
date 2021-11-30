import { queryField, nonNull, list } from 'nexus'

export const BlockReasonFindCountQuery = queryField(
  'findManyBlockReasonCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BlockReasonWhereInput',
      orderBy: list('BlockReasonOrderByWithRelationInput'),
      cursor: 'BlockReasonWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BlockReasonScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.blockReason.count(args as any)
    },
  },
)
