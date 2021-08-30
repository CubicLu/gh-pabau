import { queryField, nonNull } from 'nexus'

export const InvProductFindUniqueQuery = queryField('findUniqueInvProduct', {
  type: 'InvProduct',
  args: {
    where: nonNull('InvProductWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invProduct.findUnique({
      where,
      ...select,
    })
  },
})
