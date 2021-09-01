import { queryField, list } from 'nexus'

export const CashupReportCustomFindFirstQuery = queryField(
  'findFirstCashupReportCustom',
  {
    type: 'CashupReportCustom',
    args: {
      where: 'CashupReportCustomWhereInput',
      orderBy: list('CashupReportCustomOrderByWithRelationInput'),
      cursor: 'CashupReportCustomWhereUniqueInput',
      distinct: 'CashupReportCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cashupReportCustom.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
