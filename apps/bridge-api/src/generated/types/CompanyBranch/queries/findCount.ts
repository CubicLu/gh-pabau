import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchFindCountQuery = queryField(
  'findManyCompanyBranchCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyBranchWhereInput',
      orderBy: list('CompanyBranchOrderByWithRelationInput'),
      cursor: 'CompanyBranchWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyBranchScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranch.count(args as any)
    },
  },
)
