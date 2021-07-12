import { queryField, nonNull } from 'nexus'

export const CashupReportFindUniqueQuery = queryField(
  'findUniqueCashupReport',
  {
    type: 'CashupReport',
    args: {
      where: nonNull('CashupReportWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cashupReport.findUnique({
        where,
        ...select,
      })
    },
  },
)
