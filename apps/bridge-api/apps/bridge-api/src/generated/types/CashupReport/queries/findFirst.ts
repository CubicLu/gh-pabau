import { queryField, list } from 'nexus'

export const CashupReportFindFirstQuery = queryField('findFirstCashupReport', {
  type: 'CashupReport',
  args: {
    where: 'CashupReportWhereInput',
    orderBy: list('CashupReportOrderByWithRelationInput'),
    cursor: 'CashupReportWhereUniqueInput',
    distinct: 'CashupReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cashupReport.findFirst({
      ...args,
      ...select,
    })
  },
})
