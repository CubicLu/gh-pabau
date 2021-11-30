import { queryField, list } from 'nexus'

export const CompanyPolicyAggregateQuery = queryField(
  'aggregateCompanyPolicy',
  {
    type: 'AggregateCompanyPolicy',
    args: {
      where: 'CompanyPolicyWhereInput',
      orderBy: list('CompanyPolicyOrderByWithRelationInput'),
      cursor: 'CompanyPolicyWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPolicy.aggregate({ ...args, ...select }) as any
    },
  },
)
