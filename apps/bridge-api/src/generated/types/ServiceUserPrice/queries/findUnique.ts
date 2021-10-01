import { queryField, nonNull } from 'nexus'

export const ServiceUserPriceFindUniqueQuery = queryField(
  'findUniqueServiceUserPrice',
  {
    type: 'ServiceUserPrice',
    args: {
      where: nonNull('ServiceUserPriceWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.serviceUserPrice.findUnique({
        where,
        ...select,
      })
    },
  },
)
