import { mutationField, nonNull } from 'nexus'

export const CashupReportCustomUpdateManyMutation = mutationField(
  'updateManyCashupReportCustom',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CashupReportCustomUpdateManyMutationInput'),
      where: 'CashupReportCustomWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReportCustom.updateMany(args as any)
    },
  },
)
