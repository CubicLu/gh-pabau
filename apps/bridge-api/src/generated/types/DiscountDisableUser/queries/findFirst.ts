import { queryField, list } from 'nexus'

export const DiscountDisableUserFindFirstQuery = queryField(
  'findFirstDiscountDisableUser',
  {
    type: 'DiscountDisableUser',
    args: {
      where: 'DiscountDisableUserWhereInput',
      orderBy: list('DiscountDisableUserOrderByWithRelationInput'),
      cursor: 'DiscountDisableUserWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableUserScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableUser.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
