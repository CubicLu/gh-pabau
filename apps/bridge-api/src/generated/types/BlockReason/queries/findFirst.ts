import { queryField, list } from 'nexus'

export const BlockReasonFindFirstQuery = queryField('findFirstBlockReason', {
  type: 'BlockReason',
  args: {
    where: 'BlockReasonWhereInput',
    orderBy: list('BlockReasonOrderByWithRelationInput'),
    cursor: 'BlockReasonWhereUniqueInput',
    distinct: 'BlockReasonScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.blockReason.findFirst({
      ...args,
      ...select,
    })
  },
})
