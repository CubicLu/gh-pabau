import { queryField, nonNull } from 'nexus'

export const DiscountDisableServiceFindUniqueQuery = queryField(
  'findUniqueDiscountDisableService',
  {
    type: 'DiscountDisableService',
    args: {
      where: nonNull('DiscountDisableServiceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.discountDisableService.findUnique({
        where,
        ...select,
      })
    },
  },
)
