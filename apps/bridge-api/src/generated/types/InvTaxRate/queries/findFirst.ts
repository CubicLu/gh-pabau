import { queryField, list } from 'nexus'

export const InvTaxRateFindFirstQuery = queryField('findFirstInvTaxRate', {
  type: 'InvTaxRate',
  args: {
    where: 'InvTaxRateWhereInput',
    orderBy: list('InvTaxRateOrderByWithRelationInput'),
    cursor: 'InvTaxRateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvTaxRateScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invTaxRate.findFirst({
      ...args,
      ...select,
    })
  },
})
