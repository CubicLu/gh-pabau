import { queryField, list } from 'nexus'

export const CashupReportCustomAggregateQuery = queryField(
  'aggregateCashupReportCustom',
  {
    type: 'AggregateCashupReportCustom',
    args: {
      where: 'CashupReportCustomWhereInput',
      orderBy: list('CashupReportCustomOrderByWithRelationInput'),
      cursor: 'CashupReportCustomWhereUniqueInput',
      distinct: 'CashupReportCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cashupReportCustom.aggregate({ ...args, ...select }) as any
    },
  },
)
