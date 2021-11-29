import { mutationField, nonNull } from 'nexus'

export const TwoFactorHistoryUpdateOneMutation = mutationField(
  'updateOneTwoFactorHistory',
  {
    type: nonNull('TwoFactorHistory'),
    args: {
      data: nonNull('TwoFactorHistoryUpdateInput'),
      where: nonNull('TwoFactorHistoryWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.twoFactorHistory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
