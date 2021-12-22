import { mutationField, nonNull } from 'nexus'

export const DiscountDisableUserDeleteOneMutation = mutationField(
  'deleteOneDiscountDisableUser',
  {
    type: 'DiscountDisableUser',
    args: {
      where: nonNull('DiscountDisableUserWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.discountDisableUser.delete({
        where,
        ...select,
      })
    },
  },
)
