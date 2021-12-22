import { mutationField, nonNull } from 'nexus'

export const DiscountDisableLocationCreateOneMutation = mutationField(
  'createOneDiscountDisableLocation',
  {
    type: nonNull('DiscountDisableLocation'),
    args: {
      data: nonNull('DiscountDisableLocationCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.discountDisableLocation.create({
        data,
        ...select,
      })
    },
  },
)
