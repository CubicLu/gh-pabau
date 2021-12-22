import { queryField, nonNull } from 'nexus'

export const DiscountDisableUserFindUniqueQuery = queryField(
  'findUniqueDiscountDisableUser',
  {
    type: 'DiscountDisableUser',
    args: {
      where: nonNull('DiscountDisableUserWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.discountDisableUser.findUnique({
        where,
        ...select,
      })
    },
  },
)
