import { mutationField, nonNull } from 'nexus'

export const CashupReportCustomCreateOneMutation = mutationField(
  'createOneCashupReportCustom',
  {
    type: nonNull('CashupReportCustom'),
    args: {
      data: nonNull('CashupReportCustomCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cashupReportCustom.create({
        data,
        ...select,
      })
    },
  },
)
