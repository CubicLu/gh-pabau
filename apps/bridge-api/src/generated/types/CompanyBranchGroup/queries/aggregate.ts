import { queryField, list } from 'nexus'

export const CompanyBranchGroupAggregateQuery = queryField(
  'aggregateCompanyBranchGroup',
  {
    type: 'AggregateCompanyBranchGroup',
    args: {
      where: 'CompanyBranchGroupWhereInput',
      orderBy: list('CompanyBranchGroupOrderByWithRelationInput'),
      cursor: 'CompanyBranchGroupWhereUniqueInput',
      distinct: 'CompanyBranchGroupScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchGroup.aggregate({ ...args, ...select }) as any
    },
  },
)
