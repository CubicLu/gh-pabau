import { mutationField, nonNull } from 'nexus'

export const CashupReportCustomUpsertOneMutation = mutationField(
  'upsertOneCashupReportCustom',
  {
    type: nonNull('CashupReportCustom'),
    args: {
      where: nonNull('CashupReportCustomWhereUniqueInput'),
      create: nonNull('CashupReportCustomCreateInput'),
      update: nonNull('CashupReportCustomUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cashupReportCustom.upsert({
        ...args,
        ...select,
      })
    },
  },
)
