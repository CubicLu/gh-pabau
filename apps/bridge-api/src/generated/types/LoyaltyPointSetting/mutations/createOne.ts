import { mutationField, nonNull } from 'nexus'

export const LoyaltyPointSettingCreateOneMutation = mutationField(
  'createOneLoyaltyPointSetting',
  {
    type: nonNull('LoyaltyPointSetting'),
    args: {
      data: nonNull('LoyaltyPointSettingCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.loyaltyPointSetting.create({
        data,
        ...select,
      })
    },
  },
)
