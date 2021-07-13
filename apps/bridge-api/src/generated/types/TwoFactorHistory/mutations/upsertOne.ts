import { mutationField, nonNull } from 'nexus'

export const TwoFactorHistoryUpsertOneMutation = mutationField(
  'upsertOneTwoFactorHistory',
  {
    type: nonNull('TwoFactorHistory'),
    args: {
      where: nonNull('TwoFactorHistoryWhereUniqueInput'),
      create: nonNull('TwoFactorHistoryCreateInput'),
      update: nonNull('TwoFactorHistoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.twoFactorHistory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
