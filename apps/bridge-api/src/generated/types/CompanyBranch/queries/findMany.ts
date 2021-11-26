import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchFindManyQuery = queryField('findManyCompanyBranch', {
  type: nonNull(list(nonNull('CompanyBranch'))),
  args: {
    where: 'CompanyBranchWhereInput',
    orderBy: list('CompanyBranchOrderByWithRelationInput'),
    cursor: 'CompanyBranchWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyBranchScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyBranch.findMany({
      ...args,
      ...select,
    })
  },
})
