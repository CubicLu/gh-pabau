import { queryField, nonNull, list } from 'nexus'

export const CompanySubscriptionFindCountQuery = queryField(
  'findManyCompanySubscriptionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanySubscriptionWhereInput',
      orderBy: list('CompanySubscriptionOrderByWithRelationInput'),
      cursor: 'CompanySubscriptionWhereUniqueInput',
      distinct: 'CompanySubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companySubscription.count(args as any)
    },
  },
)
