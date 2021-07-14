import { mutationField, nonNull } from 'nexus'

export const TwoFactorHistoryUpdateOneMutation = mutationField(
  'updateOneTwoFactorHistory',
  {
    type: nonNull('TwoFactorHistory'),
    args: {
      where: nonNull('TwoFactorHistoryWhereUniqueInput'),
      data: nonNull('TwoFactorHistoryUpdateInput'),
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
