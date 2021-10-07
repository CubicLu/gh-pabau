import { queryField, nonNull, list } from 'nexus'

export const InvProductFindManyQuery = queryField('findManyInvProduct', {
  type: nonNull(list(nonNull('InvProduct'))),
  args: {
    where: 'InvProductWhereInput',
    orderBy: list('InvProductOrderByWithRelationInput'),
    cursor: 'InvProductWhereUniqueInput',
    distinct: 'InvProductScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invProduct.findMany({
      ...args,
      ...select,
    })
  },
})
