import { queryField, list } from 'nexus'

export const CompanyBranchAggregateQuery = queryField(
  'aggregateCompanyBranch',
  {
    type: 'AggregateCompanyBranch',
    args: {
      where: 'CompanyBranchWhereInput',
      orderBy: list('CompanyBranchOrderByInput'),
      cursor: 'CompanyBranchWhereUniqueInput',
      distinct: 'CompanyBranchScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranch.aggregate({ ...args, ...select }) as any
    },
  },
)
