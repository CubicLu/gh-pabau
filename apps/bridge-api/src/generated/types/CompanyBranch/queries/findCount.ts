import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchFindCountQuery = queryField(
  'findManyCompanyBranchCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyBranchWhereInput',
      orderBy: list('CompanyBranchOrderByWithRelationInput'),
      cursor: 'CompanyBranchWhereUniqueInput',
      distinct: 'CompanyBranchScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranch.count(args as any)
    },
  },
)
