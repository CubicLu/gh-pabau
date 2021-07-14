import { mutationField, nonNull } from 'nexus'

export const CashupReportUpdateManyMutation = mutationField(
  'updateManyCashupReport',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CashupReportWhereInput',
      data: nonNull('CashupReportUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReport.updateMany(args as any)
    },
  },
)
