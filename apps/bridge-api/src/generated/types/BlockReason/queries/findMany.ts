import { queryField, nonNull, list } from 'nexus'

export const BlockReasonFindManyQuery = queryField('findManyBlockReason', {
  type: nonNull(list(nonNull('BlockReason'))),
  args: {
    where: 'BlockReasonWhereInput',
    orderBy: list('BlockReasonOrderByInput'),
    cursor: 'BlockReasonWhereUniqueInput',
    distinct: 'BlockReasonScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.blockReason.findMany({
      ...args,
      ...select,
    })
  },
})
