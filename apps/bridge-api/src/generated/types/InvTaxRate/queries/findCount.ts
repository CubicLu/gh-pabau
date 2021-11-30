import { queryField, nonNull, list } from 'nexus'

export const InvTaxRateFindCountQuery = queryField('findManyInvTaxRateCount', {
  type: nonNull('Int'),
  args: {
    where: 'InvTaxRateWhereInput',
    orderBy: list('InvTaxRateOrderByWithRelationInput'),
    cursor: 'InvTaxRateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvTaxRateScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.invTaxRate.count(args as any)
  },
})
