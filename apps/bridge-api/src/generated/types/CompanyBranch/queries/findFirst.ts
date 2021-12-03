import { queryField, list } from 'nexus'

export const CompanyBranchFindFirstQuery = queryField(
  'findFirstCompanyBranch',
  {
    type: 'CompanyBranch',
    args: {
      where: 'CompanyBranchWhereInput',
      orderBy: list('CompanyBranchOrderByWithRelationInput'),
      cursor: 'CompanyBranchWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyBranchScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranch.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
