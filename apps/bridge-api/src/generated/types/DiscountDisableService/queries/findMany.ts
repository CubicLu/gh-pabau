import { queryField, nonNull, list } from 'nexus'

export const DiscountDisableServiceFindManyQuery = queryField(
  'findManyDiscountDisableService',
  {
    type: nonNull(list(nonNull('DiscountDisableService'))),
    args: {
      where: 'DiscountDisableServiceWhereInput',
      orderBy: list('DiscountDisableServiceOrderByWithRelationInput'),
      cursor: 'DiscountDisableServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableServiceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableService.findMany({
        ...args,
        ...select,
      })
    },
  },
)
