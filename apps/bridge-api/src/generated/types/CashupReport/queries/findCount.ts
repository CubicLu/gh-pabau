import { queryField, nonNull, list } from 'nexus'

export const CashupReportFindCountQuery = queryField(
  'findManyCashupReportCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CashupReportWhereInput',
      orderBy: list('CashupReportOrderByInput'),
      cursor: 'CashupReportWhereUniqueInput',
      distinct: 'CashupReportScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReport.count(args as any)
    },
  },
)
