import { mutationField, nonNull } from 'nexus'

export const CashupReportUpsertOneMutation = mutationField(
  'upsertOneCashupReport',
  {
    type: nonNull('CashupReport'),
    args: {
      where: nonNull('CashupReportWhereUniqueInput'),
      create: nonNull('CashupReportCreateInput'),
      update: nonNull('CashupReportUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cashupReport.upsert({
        ...args,
        ...select,
      })
    },
  },
)
