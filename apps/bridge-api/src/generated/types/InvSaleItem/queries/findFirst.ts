import { queryField, list } from 'nexus'

export const InvSaleItemFindFirstQuery = queryField('findFirstInvSaleItem', {
  type: 'InvSaleItem',
  args: {
    where: 'InvSaleItemWhereInput',
    orderBy: list('InvSaleItemOrderByInput'),
    cursor: 'InvSaleItemWhereUniqueInput',
    distinct: 'InvSaleItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSaleItem.findFirst({
      ...args,
      ...select,
    })
  },
})
