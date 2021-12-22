import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableUserFindManyQuery = queryField(
  'findManyDiscountDisableUser',
  {
    type: nonNull(list(nonNull('DiscountDisableUser'))),
    args: {
      where: 'DiscountDisableUserWhereInput',
      orderBy: list('DiscountDisableUserOrderByWithRelationInput'),
      cursor: 'DiscountDisableUserWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableUserScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableUser.findMany({
        ...args,
        ...select,
      })
    },
  },
)
