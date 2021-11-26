import { queryField, list } from 'nexus'

export const CompanyBranchAggregateQuery = queryField(
  'aggregateCompanyBranch',
  {
    type: 'AggregateCompanyBranch',
    args: {
      where: 'CompanyBranchWhereInput',
      orderBy: list('CompanyBranchOrderByWithRelationInput'),
      cursor: 'CompanyBranchWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranch.aggregate({ ...args, ...select }) as any
    },
  },
)
