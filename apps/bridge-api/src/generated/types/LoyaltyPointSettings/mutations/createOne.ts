import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingsCreateOneMutation = mutationField(
  'createOneLoyaltyPointSettings',
  {
    type: nonNull('LoyaltyPointSettings'),
    args: {
      data: nonNull('LoyaltyPointSettingsCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.loyaltyPointSettings.create({
        data,
        ...select,
      })
    },
  },
)
