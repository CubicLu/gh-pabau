import { queryField, nonNull } from 'nexus'

export const CompanyBranchFindUniqueQuery = queryField(
  'findUniqueCompanyBranch',
  {
    type: 'CompanyBranch',
    args: {
      where: nonNull('CompanyBranchWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyBranch.findUnique({
        where,
        ...select,
      })
    },
  },
)
