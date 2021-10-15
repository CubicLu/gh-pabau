import { queryField, list } from 'nexus'

export const CompanyBranchFindFirstQuery = queryField(
  'findFirstCompanyBranch',
  {
    type: 'CompanyBranch',
    args: {
      where: 'CompanyBranchWhereInput',
      orderBy: list('CompanyBranchOrderByInput'),
      cursor: 'CompanyBranchWhereUniqueInput',
      distinct: 'CompanyBranchScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranch.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
