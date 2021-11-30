import { queryField, list } from 'nexus'

export const CashupReportFindFirstQuery = queryField('findFirstCashupReport', {
  type: 'CashupReport',
  args: {
    where: 'CashupReportWhereInput',
    orderBy: list('CashupReportOrderByWithRelationInput'),
    cursor: 'CashupReportWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CashupReportScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cashupReport.findFirst({
      ...args,
      ...select,
    })
  },
})
