import { queryField, list } from 'nexus'

export const InvTaxRateFindFirstQuery = queryField('findFirstInvTaxRate', {
  type: 'InvTaxRate',
  args: {
    where: 'InvTaxRateWhereInput',
    orderBy: list('InvTaxRateOrderByInput'),
    cursor: 'InvTaxRateWhereUniqueInput',
    distinct: 'InvTaxRateScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invTaxRate.findFirst({
      ...args,
      ...select,
    })
  },
})
