import { mutationField, nonNull } from 'nexus'

export const DiscountDisableLocationUpdateOneMutation = mutationField(
  'updateOneDiscountDisableLocation',
  {
    type: nonNull('DiscountDisableLocation'),
    args: {
      data: nonNull('DiscountDisableLocationUpdateInput'),
      where: nonNull('DiscountDisableLocationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.discountDisableLocation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
