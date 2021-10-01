import { queryField, nonNull } from 'nexus'

export const ServiceLocationPriceFindUniqueQuery = queryField(
  'findUniqueServiceLocationPrice',
  {
    type: 'ServiceLocationPrice',
    args: {
      where: nonNull('ServiceLocationPriceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceLocationPrice.findUnique({
        where,
        ...select,
      })
    },
  },
)
