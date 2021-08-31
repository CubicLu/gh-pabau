import { queryField, nonNull, list } from 'nexus'

export const CompanyLogFindCountQuery = queryField('findManyCompanyLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'CompanyLogWhereInput',
    orderBy: list('CompanyLogOrderByWithRelationInput'),
    cursor: 'CompanyLogWhereUniqueInput',
    distinct: 'CompanyLogScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.companyLog.count(args as any)
  },
})
