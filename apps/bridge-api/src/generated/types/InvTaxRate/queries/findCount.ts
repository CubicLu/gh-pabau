import { queryField, nonNull, list } from 'nexus'

export const InvTaxRateFindCountQuery = queryField('findManyInvTaxRateCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvTaxRateWhereInput',
    orderBy: list('InvTaxRateOrderByInput'),
    cursor: 'InvTaxRateWhereUniqueInput',
    distinct: 'InvTaxRateScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invTaxRate.count(args as any)
  },
})
