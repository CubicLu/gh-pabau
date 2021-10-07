import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchGroupFindManyQuery = queryField(
  'findManyCompanyBranchGroup',
  {
    type: nonNull(list(nonNull('CompanyBranchGroup'))),
    args: {
      where: 'CompanyBranchGroupWhereInput',
      orderBy: list('CompanyBranchGroupOrderByWithRelationInput'),
      cursor: 'CompanyBranchGroupWhereUniqueInput',
      distinct: 'CompanyBranchGroupScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchGroup.findMany({
        ...args,
        ...select,
      })
    },
  },
)
