import { mutationField, nonNull } from 'nexus'

export const CashupReportUpdateOneMutation = mutationField(
  'updateOneCashupReport',
  {
    type: nonNull('CashupReport'),
    args: {
      where: nonNull('CashupReportWhereUniqueInput'),
      data: nonNull('CashupReportUpdateInput'),
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
