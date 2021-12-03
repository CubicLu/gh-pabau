import { queryField, list } from 'nexus'

export const AppSubscriptionsCompanyPriceFindFirstQuery = queryField(
  'findFirstAppSubscriptionsCompanyPrice',
  {
    type: 'AppSubscriptionsCompanyPrice',
    args: {
      where: 'AppSubscriptionsCompanyPriceWhereInput',
      orderBy: list('AppSubscriptionsCompanyPriceOrderByWithRelationInput'),
      cursor: 'AppSubscriptionsCompanyPriceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppSubscriptionsCompanyPriceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appSubscriptionsCompanyPrice.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
