import { queryField, list } from 'nexus'

export const CompanySubscriptionAggregateQuery = queryField(
  'aggregateCompanySubscription',
  {
    type: 'AggregateCompanySubscription',
    args: {
      where: 'CompanySubscriptionWhereInput',
      orderBy: list('CompanySubscriptionOrderByWithRelationInput'),
      cursor: 'CompanySubscriptionWhereUniqueInput',
      distinct: 'CompanySubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companySubscription.aggregate({ ...args, ...select }) as any
    },
  },
)
