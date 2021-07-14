import { mutationField, nonNull } from 'nexus'

export const CashupReportCustomUpdateOneMutation = mutationField(
  'updateOneCashupReportCustom',
  {
    type: nonNull('CashupReportCustom'),
    args: {
      where: nonNull('CashupReportCustomWhereUniqueInput'),
      data: nonNull('CashupReportCustomUpdateInput'),
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
