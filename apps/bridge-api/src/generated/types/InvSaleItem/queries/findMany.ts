import { queryField, nonNull, list } from 'nexus'

export const InvSaleItemFindManyQuery = queryField('findManyInvSaleItem', {
  type: nonNull(list(nonNull('InvSaleItem'))),
  args: {
    where: 'InvSaleItemWhereInput',
    orderBy: list('InvSaleItemOrderByInput'),
    cursor: 'InvSaleItemWhereUniqueInput',
    distinct: 'InvSaleItemScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invSaleItem.findMany({
      ...args,
      ...select,
    })
  },
})
