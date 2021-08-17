import { mutationField, nonNull } from 'nexus'

export const CashupReportCustomDeleteOneMutation = mutationField(
  'deleteOneCashupReportCustom',
  {
    type: 'CashupReportCustom',
    args: {
      where: nonNull('CashupReportCustomWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cashupReportCustom.delete({
        where,
        ...select,
      })
    },
  },
)
