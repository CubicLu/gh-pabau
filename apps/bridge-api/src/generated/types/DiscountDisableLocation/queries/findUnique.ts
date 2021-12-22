import { queryField, nonNull } from 'nexus'

export const DiscountDisableLocationFindUniqueQuery = queryField(
  'findUniqueDiscountDisableLocation',
  {
    type: 'DiscountDisableLocation',
    args: {
      where: nonNull('DiscountDisableLocationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.discountDisableLocation.findUnique({
        where,
        ...select,
      })
    },
  },
)
