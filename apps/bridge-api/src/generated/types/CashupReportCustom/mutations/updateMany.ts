import { mutationField, nonNull } from 'nexus'

export const CashupReportCustomUpdateManyMutation = mutationField(
  'updateManyCashupReportCustom',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CashupReportCustomWhereInput',
      data: nonNull('CashupReportCustomUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cashupReportCustom.updateMany(args as any)
    },
  },
)
