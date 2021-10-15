import { queryField, list } from 'nexus'

export const CompanyBranchGroupFindFirstQuery = queryField(
  'findFirstCompanyBranchGroup',
  {
    type: 'CompanyBranchGroup',
    args: {
      where: 'CompanyBranchGroupWhereInput',
      orderBy: list('CompanyBranchGroupOrderByInput'),
      cursor: 'CompanyBranchGroupWhereUniqueInput',
      distinct: 'CompanyBranchGroupScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchGroup.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
