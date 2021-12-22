import { mutationField, nonNull } from 'nexus'

export const DiscountDisableUserCreateOneMutation = mutationField(
  'createOneDiscountDisableUser',
  {
    type: nonNull('DiscountDisableUser'),
    args: {
      data: nonNull('DiscountDisableUserCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.discountDisableUser.create({
        data,
        ...select,
      })
    },
  },
)
