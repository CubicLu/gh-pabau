import { queryField, nonNull } from 'nexus'

export const CashupReportCustomFindUniqueQuery = queryField(
  'findUniqueCashupReportCustom',
  {
    type: 'CashupReportCustom',
    args: {
      where: nonNull('CashupReportCustomWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cashupReportCustom.findUnique({
        where,
        ...select,
      })
    },
  },
)
