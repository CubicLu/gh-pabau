import { queryField, list } from 'nexus'

export const ServiceUserPriceFindFirstQuery = queryField(
  'findFirstServiceUserPrice',
  {
    type: 'ServiceUserPrice',
    args: {
      where: 'ServiceUserPriceWhereInput',
      orderBy: list('ServiceUserPriceOrderByWithRelationInput'),
      cursor: 'ServiceUserPriceWhereUniqueInput',
      distinct: 'ServiceUserPriceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.serviceUserPrice.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
