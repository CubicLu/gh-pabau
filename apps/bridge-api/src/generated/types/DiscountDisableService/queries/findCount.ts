import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableServiceFindCountQuery = queryField(
  'findManyDiscountDisableServiceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'DiscountDisableServiceWhereInput',
      orderBy: list('DiscountDisableServiceOrderByWithRelationInput'),
      cursor: 'DiscountDisableServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableServiceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.discountDisableService.count(args as any)
    },
  },
)
