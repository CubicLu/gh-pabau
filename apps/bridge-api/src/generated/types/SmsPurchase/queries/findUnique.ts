import { queryField, nonNull } from 'nexus'

export const SmsPurchaseFindUniqueQuery = queryField('findUniqueSmsPurchase', {
  type: 'SmsPurchase',
  args: {
    where: nonNull('SmsPurchaseWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.smsPurchase.findUnique({
      where,
      ...select,
    })
  },
})
