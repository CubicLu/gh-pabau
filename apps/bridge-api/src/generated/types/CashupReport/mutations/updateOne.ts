import { mutationField, nonNull } from 'nexus'

export const CashupReportUpdateOneMutation = mutationField(
  'updateOneCashupReport',
  {
    type: nonNull('CashupReport'),
    args: {
      data: nonNull('CashupReportUpdateInput'),
      where: nonNull('CashupReportWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cashupReport.update({
        where,
        data,
        ...select,
      })
    },
  },
)
