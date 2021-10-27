import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchGroupFindCountQuery = queryField(
  'findManyCompanyBranchGroupCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyBranchGroupWhereInput',
      orderBy: list('CompanyBranchGroupOrderByWithRelationInput'),
      cursor: 'CompanyBranchGroupWhereUniqueInput',
      distinct: 'CompanyBranchGroupScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyBranchGroup.count(args as any)
    },
  },
)
