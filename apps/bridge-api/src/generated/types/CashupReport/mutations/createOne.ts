import { mutationField, nonNull } from 'nexus'

export const CashupReportCreateOneMutation = mutationField(
  'createOneCashupReport',
  {
    type: nonNull('CashupReport'),
    args: {
      data: nonNull('CashupReportCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cashupReport.create({
        data,
        ...select,
      })
    },
  },
)
