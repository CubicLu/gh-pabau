import { queryField, nonNull } from 'nexus'

export const CompanySubscriptionFindUniqueQuery = queryField(
  'findUniqueCompanySubscription',
  {
    type: 'CompanySubscription',
    args: {
      where: nonNull('CompanySubscriptionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companySubscription.findUnique({
        where,
        ...select,
      })
    },
  },
)
