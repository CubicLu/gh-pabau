import { queryField, list } from 'nexus'

export const DiscountDisableUserAggregateQuery = queryField(
  'aggregateDiscountDisableUser',
  {
    type: 'AggregateDiscountDisableUser',
    args: {
      where: 'DiscountDisableUserWhereInput',
      orderBy: list('DiscountDisableUserOrderByWithRelationInput'),
      cursor: 'DiscountDisableUserWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableUser.aggregate({ ...args, ...select }) as any
    },
  },
)
