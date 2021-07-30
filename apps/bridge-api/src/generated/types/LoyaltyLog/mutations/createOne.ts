import { mutationField, nonNull } from 'nexus'

export const LoyaltyLogCreateOneMutation = mutationField(
  'createOneLoyaltyLog',
  {
    type: nonNull('LoyaltyLog'),
    args: {
      data: nonNull('LoyaltyLogCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.loyaltyLog.create({
        data,
        ...select,
      })
    },
  },
)
