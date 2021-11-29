import { queryField, nonNull, list } from 'nexus'

export const CompanySubscriptionFindManyQuery = queryField(
  'findManyCompanySubscription',
  {
    type: nonNull(list(nonNull('CompanySubscription'))),
    args: {
      where: 'CompanySubscriptionWhereInput',
      orderBy: list('CompanySubscriptionOrderByWithRelationInput'),
      cursor: 'CompanySubscriptionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanySubscriptionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companySubscription.findMany({
        ...args,
        ...select,
      })
    },
  },
)
