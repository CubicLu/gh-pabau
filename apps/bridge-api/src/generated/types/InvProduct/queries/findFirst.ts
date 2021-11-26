import { queryField, list } from 'nexus'

export const InvProductFindFirstQuery = queryField('findFirstInvProduct', {
  type: 'InvProduct',
  args: {
    where: 'InvProductWhereInput',
    orderBy: list('InvProductOrderByWithRelationInput'),
    cursor: 'InvProductWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvProductScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invProduct.findFirst({
      ...args,
      ...select,
    })
  },
})
