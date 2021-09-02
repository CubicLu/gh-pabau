import { queryField, nonNull, list } from 'nexus'

export const CashupReportFindManyQuery = queryField('findManyCashupReport', {
  type: nonNull(list(nonNull('CashupReport'))),
  args: {
    where: 'CashupReportWhereInput',
    orderBy: list('CashupReportOrderByWithRelationInput'),
    cursor: 'CashupReportWhereUniqueInput',
    distinct: 'CashupReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cashupReport.findMany({
      ...args,
      ...select,
    })
  },
})
