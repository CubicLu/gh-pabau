import { queryField, nonNull, list } from 'nexus'

export const CompanyBranchFindManyQuery = queryField('findManyCompanyBranch', {
  type: nonNull(list(nonNull('CompanyBranch'))),
  args: {
    where: 'CompanyBranchWhereInput',
    orderBy: list('CompanyBranchOrderByInput'),
    cursor: 'CompanyBranchWhereUniqueInput',
    distinct: 'CompanyBranchScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyBranch.findMany({
      ...args,
      ...select,
    })
  },
})
