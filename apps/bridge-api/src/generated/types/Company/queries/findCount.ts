import { queryField, nonNull, list } from 'nexus'

export const CompanyFindCountQuery = queryField('findManyCompanyCount', {
  type: nonNull('Int'),
  args: {
    where: 'CompanyWhereInput',
    orderBy: list('CompanyOrderByWithRelationInput'),
    cursor: 'CompanyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.company.count(args as any)
  },
})
