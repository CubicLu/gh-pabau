import { queryField, list } from 'nexus'

export const CompanySubscriptionFindFirstQuery = queryField(
  'findFirstCompanySubscription',
  {
    type: 'CompanySubscription',
    args: {
      where: 'CompanySubscriptionWhereInput',
      orderBy: list('CompanySubscriptionOrderByWithRelationInput'),
      cursor: 'CompanySubscriptionWhereUniqueInput',
      distinct: 'CompanySubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companySubscription.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
