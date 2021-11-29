import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchGroupFindManyQuery = queryField(
  'findManyCompanyBranchGroup',
  {
    type: nonNull(list(nonNull('CompanyBranchGroup'))),
    args: {
      where: 'CompanyBranchGroupWhereInput',
      orderBy: list('CompanyBranchGroupOrderByWithRelationInput'),
      cursor: 'CompanyBranchGroupWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyBranchGroupScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyBranchGroup.findMany({
        ...args,
        ...select,
      })
    },
  },
)
