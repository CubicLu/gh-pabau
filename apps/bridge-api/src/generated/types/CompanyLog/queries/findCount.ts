import { queryField, nonNull, list } from 'nexus'

export const CompanyLogFindCountQuery = queryField('findManyCompanyLogCount', {
  type: nonNull('Int'),
  args: {
    where: 'CompanyLogWhereInput',
    orderBy: list('CompanyLogOrderByWithRelationInput'),
    cursor: 'CompanyLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CompanyLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.companyLog.count(args as any)
  },
})
