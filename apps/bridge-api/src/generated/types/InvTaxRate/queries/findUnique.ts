import { queryField, nonNull } from 'nexus'

export const InvTaxRateFindUniqueQuery = queryField('findUniqueInvTaxRate', {
  type: 'InvTaxRate',
  args: {
    where: nonNull('InvTaxRateWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invTaxRate.findUnique({
      where,
      ...select,
    })
  },
})
