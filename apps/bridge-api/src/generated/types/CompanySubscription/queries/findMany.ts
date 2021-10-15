import { queryField, nonNull, list } from 'nexus'

export const CompanySubscriptionFindManyQuery = queryField(
  'findManyCompanySubscription',
  {
    type: nonNull(list(nonNull('CompanySubscription'))),
    args: {
      where: 'CompanySubscriptionWhereInput',
      orderBy: list('CompanySubscriptionOrderByInput'),
      cursor: 'CompanySubscriptionWhereUniqueInput',
      distinct: 'CompanySubscriptionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companySubscription.findMany({
        ...args,
        ...select,
      })
    },
  },
)
