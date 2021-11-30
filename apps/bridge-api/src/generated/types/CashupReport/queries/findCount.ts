import { queryField, nonNull, list } from 'nexus'

export const CashupReportFindCountQuery = queryField(
  'findManyCashupReportCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CashupReportWhereInput',
      orderBy: list('CashupReportOrderByWithRelationInput'),
      cursor: 'CashupReportWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CashupReportScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReport.count(args as any)
    },
  },
)
