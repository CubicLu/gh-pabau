import { mutationField, nonNull } from 'nexus'

export const DiscountDisableServiceUpdateOneMutation = mutationField(
  'updateOneDiscountDisableService',
  {
    type: nonNull('DiscountDisableService'),
    args: {
      data: nonNull('DiscountDisableServiceUpdateInput'),
      where: nonNull('DiscountDisableServiceWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.discountDisableService.update({
        where,
        data,
        ...select,
      })
    },
  },
)
