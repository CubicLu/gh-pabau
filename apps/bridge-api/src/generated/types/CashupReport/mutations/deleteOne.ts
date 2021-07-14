import { mutationField, nonNull } from 'nexus'

export const CashupReportDeleteOneMutation = mutationField(
  'deleteOneCashupReport',
  {
    type: 'CashupReport',
    args: {
      where: nonNull('CashupReportWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cashupReport.delete({
        where,
        ...select,
      })
    },
  },
)
