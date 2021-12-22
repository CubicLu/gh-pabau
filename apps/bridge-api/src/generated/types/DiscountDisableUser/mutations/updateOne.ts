import { mutationField, nonNull } from 'nexus'

export const DiscountDisableUserUpdateOneMutation = mutationField(
  'updateOneDiscountDisableUser',
  {
    type: nonNull('DiscountDisableUser'),
    args: {
      data: nonNull('DiscountDisableUserUpdateInput'),
      where: nonNull('DiscountDisableUserWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.discountDisableUser.update({
        where,
        data,
        ...select,
      })
    },
  },
)
