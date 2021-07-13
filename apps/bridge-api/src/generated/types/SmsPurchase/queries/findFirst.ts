import { queryField, list } from 'nexus'

export const SmsPurchaseFindFirstQuery = queryField('findFirstSmsPurchase', {
  type: 'SmsPurchase',
  args: {
    where: 'SmsPurchaseWhereInput',
    orderBy: list('SmsPurchaseOrderByInput'),
    cursor: 'SmsPurchaseWhereUniqueInput',
    distinct: 'SmsPurchaseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsPurchase.findFirst({
      ...args,
      ...select,
    })
  },
})
