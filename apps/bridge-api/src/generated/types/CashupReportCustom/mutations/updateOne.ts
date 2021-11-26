import { mutationField, nonNull } from 'nexus'

export const CashupReportCustomUpdateOneMutation = mutationField(
  'updateOneCashupReportCustom',
  {
    type: nonNull('CashupReportCustom'),
    args: {
      data: nonNull('CashupReportCustomUpdateInput'),
      where: nonNull('CashupReportCustomWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cashupReportCustom.update({
        where,
        data,
        ...select,
      })
    },
  },
)
