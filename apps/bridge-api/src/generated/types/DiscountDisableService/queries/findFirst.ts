import { queryField, list } from 'nexus'

export const DiscountDisableServiceFindFirstQuery = queryField(
  'findFirstDiscountDisableService',
  {
    type: 'DiscountDisableService',
    args: {
      where: 'DiscountDisableServiceWhereInput',
      orderBy: list('DiscountDisableServiceOrderByWithRelationInput'),
      cursor: 'DiscountDisableServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('DiscountDisableServiceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.discountDisableService.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
