import { queryField, list } from 'nexus'

export const CashupReportAggregateQuery = queryField('aggregateCashupReport', {
  type: 'AggregateCashupReport',
  args: {
    where: 'CashupReportWhereInput',
    orderBy: list('CashupReportOrderByInput'),
    cursor: 'CashupReportWhereUniqueInput',
    distinct: 'CashupReportScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cashupReport.aggregate({ ...args, ...select }) as any
  },
})
