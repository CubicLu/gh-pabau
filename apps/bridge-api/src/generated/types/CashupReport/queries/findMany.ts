import { queryField, nonNull, list } from 'nexus'

export const CashupReportFindManyQuery = queryField('findManyCashupReport', {
  type: nonNull(list(nonNull('CashupReport'))),
  args: {
    where: 'CashupReportWhereInput',
    orderBy: list('CashupReportOrderByWithRelationInput'),
    cursor: 'CashupReportWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CashupReportScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cashupReport.findMany({
      ...args,
      ...select,
    })
  },
})
