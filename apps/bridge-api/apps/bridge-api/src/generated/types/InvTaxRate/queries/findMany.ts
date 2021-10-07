import { queryField, nonNull, list } from 'nexus'

export const InvTaxRateFindManyQuery = queryField('findManyInvTaxRate', {
  type: nonNull(list(nonNull('InvTaxRate'))),
  args: {
    where: 'InvTaxRateWhereInput',
    orderBy: list('InvTaxRateOrderByWithRelationInput'),
    cursor: 'InvTaxRateWhereUniqueInput',
    distinct: 'InvTaxRateScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invTaxRate.findMany({
      ...args,
      ...select,
    })
  },
})
