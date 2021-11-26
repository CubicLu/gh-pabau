import { queryField, list } from 'nexus'

export const CompanySubscriptionFindFirstQuery = queryField(
  'findFirstCompanySubscription',
  {
    type: 'CompanySubscription',
    args: {
      where: 'CompanySubscriptionWhereInput',
      orderBy: list('CompanySubscriptionOrderByWithRelationInput'),
      cursor: 'CompanySubscriptionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanySubscriptionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companySubscription.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
