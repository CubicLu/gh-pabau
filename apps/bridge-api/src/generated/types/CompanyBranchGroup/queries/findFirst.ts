import { queryField, list } from 'nexus'

export const CompanyBranchGroupFindFirstQuery = queryField(
  'findFirstCompanyBranchGroup',
  {
    type: 'CompanyBranchGroup',
    args: {
      where: 'CompanyBranchGroupWhereInput',
      orderBy: list('CompanyBranchGroupOrderByWithRelationInput'),
      cursor: 'CompanyBranchGroupWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyBranchGroupScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchGroup.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
