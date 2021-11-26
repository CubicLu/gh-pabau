import { mutationField, nonNull } from 'nexus'

export const CashupReportUpdateManyMutation = mutationField(
  'updateManyCashupReport',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CashupReportUpdateManyMutationInput'),
      where: 'CashupReportWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReport.updateMany(args as any)
    },
  },
)
