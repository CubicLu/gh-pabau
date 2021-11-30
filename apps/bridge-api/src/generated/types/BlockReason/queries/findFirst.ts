import { queryField, list } from 'nexus'

export const BlockReasonFindFirstQuery = queryField('findFirstBlockReason', {
  type: 'BlockReason',
  args: {
    where: 'BlockReasonWhereInput',
    orderBy: list('BlockReasonOrderByWithRelationInput'),
    cursor: 'BlockReasonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('BlockReasonScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.blockReason.findFirst({
      ...args,
      ...select,
    })
  },
})
