import { queryField, list } from 'nexus'

export const InvProductFindFirstQuery = queryField('findFirstInvProduct', {
  type: 'InvProduct',
  args: {
    where: 'InvProductWhereInput',
    orderBy: list('InvProductOrderByWithRelationInput'),
    cursor: 'InvProductWhereUniqueInput',
    distinct: 'InvProductScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invProduct.findFirst({
      ...args,
      ...select,
    })
  },
})
