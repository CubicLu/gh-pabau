import { queryField, list } from 'nexus'

export const SmsPurchaseFindFirstQuery = queryField('findFirstSmsPurchase', {
  type: 'SmsPurchase',
  args: {
    where: 'SmsPurchaseWhereInput',
    orderBy: list('SmsPurchaseOrderByWithRelationInput'),
    cursor: 'SmsPurchaseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SmsPurchaseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsPurchase.findFirst({
      ...args,
      ...select,
    })
  },
})
