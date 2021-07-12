import { queryField, nonNull } from 'nexus'

export const CompanyBranchGroupFindUniqueQuery = queryField(
  'findUniqueCompanyBranchGroup',
  {
    type: 'CompanyBranchGroup',
    args: {
      where: nonNull('CompanyBranchGroupWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.companyBranchGroup.findUnique({
        where,
        ...select,
      })
    },
  },
)
