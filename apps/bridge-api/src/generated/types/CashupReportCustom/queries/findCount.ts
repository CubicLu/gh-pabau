import { queryField, nonNull, list } from 'nexus'

export const CashupReportCustomFindCountQuery = queryField(
  'findManyCashupReportCustomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CashupReportCustomWhereInput',
      orderBy: list('CashupReportCustomOrderByWithRelationInput'),
      cursor: 'CashupReportCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CashupReportCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReportCustom.count(args as any)
    },
  },
)
