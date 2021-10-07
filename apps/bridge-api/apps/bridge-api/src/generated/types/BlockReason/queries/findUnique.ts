import { queryField, nonNull } from 'nexus'

export const BlockReasonFindUniqueQuery = queryField('findUniqueBlockReason', {
  type: 'BlockReason',
  args: {
    where: nonNull('BlockReasonWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.blockReason.findUnique({
      where,
      ...select,
    })
  },
})
