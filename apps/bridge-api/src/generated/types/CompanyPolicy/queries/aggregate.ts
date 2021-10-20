import { queryField, list } from 'nexus'

export const CompanyPolicyAggregateQuery = queryField(
  'aggregateCompanyPolicy',
  {
    type: 'AggregateCompanyPolicy',
    args: {
      where: 'CompanyPolicyWhereInput',
      orderBy: list('CompanyPolicyOrderByWithRelationInput'),
      cursor: 'CompanyPolicyWhereUniqueInput',
      distinct: 'CompanyPolicyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPolicy.aggregate({ ...args, ...select }) as any
    },
  },
)
