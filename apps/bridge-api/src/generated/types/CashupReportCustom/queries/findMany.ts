import { queryField, nonNull, list } from 'nexus'

export const CashupReportCustomFindManyQuery = queryField(
  'findManyCashupReportCustom',
  {
    type: nonNull(list(nonNull('CashupReportCustom'))),
    args: {
      where: 'CashupReportCustomWhereInput',
      orderBy: list('CashupReportCustomOrderByWithRelationInput'),
      cursor: 'CashupReportCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CashupReportCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cashupReportCustom.findMany({
        ...args,
        ...select,
      })
    },
  },
)
