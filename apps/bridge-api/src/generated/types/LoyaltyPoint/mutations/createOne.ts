import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointCreateOneMutation = mutationField(
  'createOneLoyaltyPoint',
  {
    type: nonNull('LoyaltyPoint'),
    args: {
      data: nonNull('LoyaltyPointCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.loyaltyPoint.create({
        data,
        ...select,
      })
    },
  },
)
