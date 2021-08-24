import { queryField, nonNull, list } from 'nexus'

export const CashupReportCustomFindCountQuery = queryField(
  'findManyCashupReportCustomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CashupReportCustomWhereInput',
      orderBy: list('CashupReportCustomOrderByInput'),
      cursor: 'CashupReportCustomWhereUniqueInput',
      distinct: 'CashupReportCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReportCustom.count(args as any)
    },
  },
)
