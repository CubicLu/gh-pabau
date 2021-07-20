import { mutationField, nonNull } from 'nexus'

export const TwoFactorHistoryCreateOneMutation = mutationField(
  'createOneTwoFactorHistory',
  {
    type: nonNull('TwoFactorHistory'),
    args: {
      data: nonNull('TwoFactorHistoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.twoFactorHistory.create({
        data,
        ...select,
      })
    },
  },
)
