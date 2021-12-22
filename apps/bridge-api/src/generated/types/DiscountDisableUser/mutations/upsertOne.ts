import { mutationField, nonNull } from 'nexus'

export const DiscountDisableUserUpsertOneMutation = mutationField(
  'upsertOneDiscountDisableUser',
  {
    type: nonNull('DiscountDisableUser'),
    args: {
      where: nonNull('DiscountDisableUserWhereUniqueInput'),
      create: nonNull('DiscountDisableUserCreateInput'),
      update: nonNull('DiscountDisableUserUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableUser.upsert({
        ...args,
        ...select,
      })
    },
  },
)
