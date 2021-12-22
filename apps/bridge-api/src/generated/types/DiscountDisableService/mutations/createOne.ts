import { mutationField, nonNull } from 'nexus'

export const DiscountDisableServiceCreateOneMutation = mutationField(
  'createOneDiscountDisableService',
  {
    type: nonNull('DiscountDisableService'),
    args: {
      data: nonNull('DiscountDisableServiceCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.discountDisableService.create({
        data,
        ...select,
      })
    },
  },
)
