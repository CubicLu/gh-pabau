import { queryField, nonNull, list } from 'nexus'

export const BlockReasonFindManyQuery = queryField('findManyBlockReason', {
  type: nonNull(list(nonNull('BlockReason'))),
  args: {
    where: 'BlockReasonWhereInput',
    orderBy: list('BlockReasonOrderByWithRelationInput'),
    cursor: 'BlockReasonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BlockReasonScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.blockReason.findMany({
      ...args,
      ...select,
    })
  },
})
