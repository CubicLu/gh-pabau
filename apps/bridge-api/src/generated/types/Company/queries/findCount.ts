import { queryField, nonNull, list } from 'nexus'

export const CompanyFindCountQuery = queryField('findManyCompanyCount', {
  type: nonNull('Int'),
  args: {
    where: 'CompanyWhereInput',
    orderBy: list('CompanyOrderByInput'),
    cursor: 'CompanyWhereUniqueInput',
    distinct: 'CompanyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.company.count(args as any)
  },
})
